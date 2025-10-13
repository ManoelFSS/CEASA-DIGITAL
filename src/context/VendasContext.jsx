import { createContext, useContext, useState } from "react";
import { supabase } from '../services/supabase';
// context
import { useAuthContext } from "./AuthContext";
import { useClientes } from "./ClientesContext";
import { useDashboard } from "./DashboardContext";

const VendasContext = createContext();

export const VendasProvider = ({ children }) => {

    const { setReloadDashboard } = useDashboard();
    const { idClient, atualizarStatusParaDebitos, setCaunterVendas } = useClientes();
    const { userId} = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [messege, setMessege] = useState(null);// controle do componente messege
    const [closeModal, setCloseModal] = useState(false);
    const [vendas, setVendas] = useState([]);// lista de clientes

    const [name, setName] = useState('');// controle do campo name
    const [phone, setPhone] = useState('');// controle do campo phone
    const [idVenda, setIdVenda] = useState('');// controle do campo idClient


    const editarVenda = async (venda_id, status) => {
        try {
            const { error } = await supabase.rpc('cancelar_venda', {
                p_venda_id: venda_id,
                p_status: status
            });

            if (error) {
                console.error('[ERRO RPC cancelar_venda]', error.message);
                return;
            }

            console.log('[SUCESSO] Venda atualizada com sucesso no banco');

            if (status === "Cancelada") {
                setReloadDashboard(prev => !prev);

                const getNumeroDeVendasDoCliente = await contarVendasPendentesOuAtrasadas(userId, idClient);
                console.log("contarVendas", getNumeroDeVendasDoCliente);

                if (getNumeroDeVendasDoCliente === 0) {
                    await atualizarStatusParaDebitos(idClient, "Em Dias");
                    console.log("cliente não tem nenhuma venda pendente, status Em Dias");
                }
            }

        } catch (err) {
            console.error('[ERRO GERAL] Erro inesperado ao editar a venda:', {
                venda_id,
                status,
                erro: err.message,
            });
        }
    };


    // Função principal para buscar vendas de um admin com paginação, incluindo pendentes ou atrasadas
    const buscarVendasPorAdmin = async (adminId, limitepage, paginacao, ano, mes) => {
        try {
            // Validar parâmetros
            if (!adminId || limitepage <= 0 || paginacao < 1 || !ano || !mes) {
                throw new Error("Parâmetros inválidos: adminId, limitepage, paginacao, ano ou mes");
            }

            // Construir intervalo de datas (do primeiro ao último dia do mês)
            const inicioMes = `${ano}-${String(mes).padStart(2, '0')}-01T00:00:00.000Z`;
            const fimMes = new Date(Date.UTC(ano, mes, 0, 23, 59, 59, 999)).toISOString();

            // Calcular range para paginação
            const from = (paginacao - 1) * limitepage;
            const to = from + limitepage - 1;

            // Contar total de vendas do mês ou com status pendente (tiramos 'Atrasada')
            const { count, error: countError } = await supabase
                .from("vendas")
                .select("id", { count: "exact", head: true })
                .eq("adminid", adminId)
                .or(
                    `and(created_at.gte.${inicioMes},created_at.lte.${fimMes}),and(status.eq.Pendente,created_at.lte.${fimMes})`
                );

            if (countError) throw countError;

            // Atualiza o contador
            setCaunterVendas(count);

            // Buscar vendas com dados das parcelas e itens
            const { data, error } = await supabase
                .from("vendas")
                .select(`
                    *,
                    parcelas_venda(*),
                    itens_venda(*)
                `)
                .eq("adminid", adminId)
                .or(
                    `and(created_at.gte.${inicioMes},created_at.lte.${fimMes}),and(status.eq.Pendente,created_at.lte.${fimMes})`
                )
                .order("contador_vendas", { ascending: true })
                .range(from, to);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error("Erro ao buscar vendas:", error);
            throw error;
        }
    };


    const buscarVendasSeach = async (searchText, adminId, limitepage, paginacao) => {
        if (!searchText || !adminId) return [];

        try {
            const texto = `%${searchText.toLowerCase()}%`;

            // Calcular range de paginação
            const from = (paginacao - 1) * limitepage;
            const to = from + limitepage - 1;

            // Buscar total de registros da busca
            const { count, error: countError } = await supabase
                .from("vendas")
                .select("id", { count: "exact", head: true })
                .eq("adminid", adminId)
                .or(`name.ilike.${texto},phone.ilike.${texto}`);

            if (countError) throw countError;

            setCaunterVendas(count); // atualiza total para a paginação

            // Buscar os registros paginados **com parcelas e itens**
            const { data, error } = await supabase
                .from("vendas")
                .select(`
                    *,
                    parcelas_venda(*),
                    itens_venda(*)
                `)
                .eq("adminid", adminId)
                .or(`name.ilike.${texto},phone.ilike.${texto}`)
                .order("created_at", { ascending: false })
                .range(from, to);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error("Erro ao buscar venda:", error.message || error);
            return [];
        }
    };


    const editarParcelaStatus = async (parcela_id, status)  => {
        const { data, error } = await supabase
            .from('parcelas_venda') // substitua pelo nome correto da sua tabela
            .update({ status: status })
            .eq('id', parcela_id); // ou 'parcela_id', dependendo do nome do campo

        if (error) {
            console.error('Erro ao atualizar status de pagamento da parcela:', error);
        } else {
            console.log('Parcela paga e atualizado com sucesso:', data);
        }
    }

    
    const contarVendasPendentesOuAtrasadas = async (adminId, clienteId) => {
        const { count, error } = await supabase
            .from('vendas')
            .select('*', { count: 'exact', head: true }) // não retorna dados, só conta
            .eq('adminid', adminId)
            .eq('cliente_id', clienteId)
            .in('status', ['Pendente', 'Atrasada']); // status igual a um dos dois

        if (error) {
            console.error('Erro ao contar vendas:', error);
            throw error;
        }
        return count;
    }


    return (
        <VendasContext.Provider value={{ 
                buscarVendasPorAdmin,
                loading, setLoading,
                messege, setMessege,
                closeModal, setCloseModal,
                vendas, setVendas,
                buscarVendasSeach,
                name, setName,
                phone, setPhone,
                idVenda, setIdVenda,
                editarParcelaStatus,
                editarVenda,
                contarVendasPendentesOuAtrasadas,
            }}>
        {children}
        </VendasContext.Provider>
    );
};

// Hook para usar o contexto
export const useVendas = () => useContext(VendasContext);
