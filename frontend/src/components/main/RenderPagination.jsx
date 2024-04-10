import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@/components/ui/pagination';

function RenderPagination({ activePage, totalPages }) {
   return (
      <Pagination>
         <PaginationContent>
            {activePage > 1 && (
               <PaginationItem>
                  <PaginationPrevious to={`?page=${activePage - 1}`} />
               </PaginationItem>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => (
               <PaginationItem key={item}>
                  <PaginationLink
                     isActive={activePage === item}
                     to={`?page=${item}`}
                  >
                     {item}
                  </PaginationLink>
               </PaginationItem>
            ))}
            {/* <PaginationItem>
               <PaginationEllipsis />
            </PaginationItem> */}
            {activePage < totalPages && (
               <PaginationItem>
                  <PaginationNext to={`?page=${activePage + 1}`} />
               </PaginationItem>
            )}
         </PaginationContent>
      </Pagination>
   );
}
export default RenderPagination;
