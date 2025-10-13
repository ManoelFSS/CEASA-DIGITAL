import { useState } from "react";
import { Container } from "./styles";
import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const Pagination = ({ $totalPages, $setPaginacao, $paginacao }) => {

    const visiblePages = 5;
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= $totalPages) {
            $setPaginacao(newPage);
        }
    };

    const getPageRange = () => {
        const half = Math.floor(visiblePages / 2);
        let start = $paginacao - half;
        let end = $paginacao + half;

        if (start < 1) {
            start = 1;
            end = visiblePages;
        }

        if (end > $totalPages) {
            end = $totalPages;
            start = $totalPages - visiblePages + 1;
            if (start < 1) start = 1;
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const range = getPageRange();

    return (
        <Container>
            <MdKeyboardArrowLeft 
                className="icon-left" 
                onClick={() => {handlePageChange($paginacao > 1 ? $paginacao - 1 : 1), $setPaginacao($paginacao > 1 ? $paginacao - 1 : 1)}} 
            />

            <div className="body-pages">
                {range[0] > 1 && <span>...</span>}
                {range.map((p) => (
                    <button
                        key={p}
                        className={p === $paginacao ? "active" : ""}
                        onClick={() => {handlePageChange(p), $setPaginacao(p)}}
                    >
                        {p}
                    </button>
                ))}
                 {range[range.length - 1] < $totalPages && <span>...</span>}
            </div>

            <MdOutlineKeyboardArrowRight 
                className="icon-right" 
                onClick={() => { handlePageChange($paginacao < $totalPages ? $paginacao + 1 : $paginacao), $setPaginacao($paginacao < $totalPages ? $paginacao + 1 : $paginacao) }} 
            />
        </Container>
    );
};

export default Pagination;
