import ReactPaginate from 'react-paginate';
import './styles.css';

type Props = {
  pageCount: number;
  activePage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ activePage, pageCount, onPageChange }: Props) => {

  return (
    <div id="pagination-container">
      <ReactPaginate
        pageCount={ pageCount }
        forcePage={ activePage }
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageLinkClassName="page-item"
        breakLinkClassName="page-item"
        nextLabel={ <i className="bi bi-chevron-right"></i> }
        previousLabel={ <i className="bi bi-chevron-left"></i> }
        activeLinkClassName="active-page"
        disabledClassName="inactive-arrow"
        onPageChange={(page) => onPageChange(page.selected) }
      />
    </div>
  );
}

export default Pagination;
