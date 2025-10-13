import { createContext, useContext, useState } from "react";
import { supabase } from '../services/supabase';
// context
import { useAuthContext } from "./AuthContext";
import { useFornecedores } from "./FornecedoresContext";
import { useDashboard } from "./DashboardContext";


const BuysContext = createContext();

export const BuysProvider = ({ children }) => {

    const {setReloadDashboard } = useDashboard();
    const { idFornecedor, atualizarStatusParaDebitos, setCaunterCompras } = useFornecedores();
    const { userId} = useAuthContext();

    
    const [loading, setLoading] = useState(false);
    const [messege, setMessege] = useState(null);// controle do componente messege
    const [closeModal, setCloseModal] = useState(false);
    const [compras, setCompras] = useState([]);// lista de clientes

    const [name, setName] = useState('');// controle do campo name
    const [phone, setPhone] = useState('');// controle do campo phone
    const [idCompra, setIdCompra] = useState('');// controle do campo idClient


    const editarCompra = async (compra_id, status) => {
        try {
            const { error } = await supabase.rpc('cancelar_compra', {
                p_compra_id: compra_id,
                p_status: status
            });

            if (error) {
                console.error('[ERRO RPC cancelar_compra]', error.message);
                return;
            }

            console.log('[SUCESSO] Compra atualizada com sucesso no banco');

            if (status === "Cancelada") {
                setReloadDashboard(prev => !prev);

                const getNumeroDeComprasDoFornecedor = await contarCompraPendentesOuAtrasadas(userId, idFornecedor);
                console.log("contarCompra", getNumeroDeComprasDoFornecedor);

                if (getNumeroDeComprasDoFornecedor === 0) {
                    await atualizarStatusParaDebitos(idFornecedor, "Nada a Pagar");
                    console.log("Fornecedor não tem nenhuma compra pendente, status Nada a Pagar");
                }
            }

        } catch (err) {
            console.error('[ERRO GERAL] Erro inesperado ao editar a compra:', {
                compra_id,
                status,
                erro: err.message,
            });
        }
    };


   // Função principal para buscar vendas de um admin com paginação, incluindo pendentes ou atrasadas
    const buscarComprasPorAdmin = async (adminId, limitepage, paginacao, ano, mes) => {
        try {
            if (!adminId || limitepage <= 0 || paginacao < 1 || !ano || !mes) {
                throw new Error("Parâmetros inválidos: adminId, limitepage, paginacao, ano ou mes");
            }

            const inicioMes = `${ano}-${String(mes).padStart(2, '0')}-01T00:00:00.000Z`;
            const fimMes = new Date(Date.UTC(ano, mes, 0, 23, 59, 59, 999)).toISOString();


            const from = (paginacao - 1) * limitepage;
            const to = from + limitepage - 1;

            // COUNT
            const { count, error: countError } = await supabase
                .from("compras")
                .select("id", { count: "exact", head: true })
                .eq("adminid", adminId)
                .or(
                    `and(created_at.gte.${inicioMes},created_at.lte.${fimMes}),status.eq.Pendente`
                );

            if (countError) throw countError;

            setCaunterCompras(count);

            // SELECT
            const { data, error } = await supabase
                .from("compras")
                .select(`
                    *,
                    parcelas_compra(*),
                    itens_compra(*)
                `)
                .eq("adminid", adminId)
                .or(
                    `and(created_at.gte.${inicioMes},created_at.lte.${fimMes}),status.eq.Pendente`
                )
                .order("contador_compras", { ascending: true })
                .range(from, to);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error("Erro ao buscar compras:", error);
            throw error;
        }
    };

    const buscarComprasSeach = async (searchText, adminId, limitepage, paginacao) => {
        if (!searchText || !adminId) return [];

        try {
            const texto = `%${searchText.toLowerCase()}%`;
            // Calcular range de paginação
            const from = (paginacao - 1) * limitepage;
            const to = from + limitepage - 1;

            // Buscar total de registros da busca
            const { count, error: countError } = await supabase
                .from("compras")
                .select("id", { count: "exact", head: true })
                .eq("adminid", adminId)
                .or(`name.ilike.${texto},phone.ilike.${texto}`);

            if (countError) throw countError;
             setCaunterCompras(count); // atualiza total para a paginação

            // Buscar os registros paginados **com parcelas e itens**
            const { data, error } = await supabase
                .from("compras")
                .select(`
                    *,
                    parcelas_compra(*),
                    itens_compra(*)
                `)
                .eq("adminid", adminId)
                .or(`name.ilike.${texto},phone.ilike.${texto}`)
                .order("created_at", { ascending: false })
                .range(from, to);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error("Erro ao buscar compras:", error.message || error);
            return [];
        }
    };


    const editarParcelaStatus = async (parcela_id, status)  => {
        const { data, error } = await supabase
            .from('parcelas_compra') // substitua pelo nome correto da sua tabela
            .update({ status: status })
            .eq('id', parcela_id); // ou 'parcela_id', dependendo do nome do campo

        if (error) {
            console.error('Erro ao atualizar status de pagamento da parcela:', error);
        } else {
            console.log('Parcela paga e atualizado com sucesso:', data);
        }
    }

    
    const contarCompraPendentesOuAtrasadas = async (adminId, fornecedorId) => {
        const { count, error } = await supabase
            .from('compras')
            .select('*', { count: 'exact', head: true }) // não retorna dados, só conta
            .eq('adminid', adminId)
            .eq('fornecedor_id', fornecedorId)
            .in('status', ['Pendente', 'Atrasada']); // status igual a um dos dois

        if (error) {
            console.error('Erro ao contar compras:', error);
            throw error;
        }
        return count;
    }


    return (
        <BuysContext.Provider value={{ 
                buscarComprasPorAdmin,
                loading, setLoading,
                messege, setMessege,
                closeModal, setCloseModal,
                compras, setCompras,
                buscarComprasSeach,
                editarCompra,
                name, setName,
                phone, setPhone,
                idCompra, setIdCompra,
                editarParcelaStatus,
                contarCompraPendentesOuAtrasadas 
            }}>
        {children}
        </BuysContext.Provider>
    );
};

// Hook para usar o contexto
export const useBuys = () => useContext(BuysContext);
