import ProdCard from "./ProductCard";
import usePaginatedFetch from "../Hooks/usePaginatedFetch";
import { useAuth } from "../context/AuthContext";
import Icon from "./Icon";
import Loading from "./SmallLoadingSpinner";

const ProdGridPaginated = ({ tableName, gender, itemsPerPage = 6 }) => {
  const { user } = useAuth();

  const {
    products,
    loading,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  } = usePaginatedFetch(tableName, gender, itemsPerPage);

  if (loading) {
    return <Loading />;
  }

  if (products.length < 1) {
    return (
      <div className="flex items-center justify-center uppercase font-[jost ] text-gray-500">
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div>
      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-3 px-3 md:grid-cols-3">
        {products?.map((product) => {
          const newWishlistItem = {
            product_id: product.id,
            product_name: product.product_name,
            product_price: product.product_price,
            imageUrl_1: product.imageUrl_1,
            imageUrl_2: product.imageUrl_2,
            discounts: product.discounts,
            user_id: user?.id,
          };

          const newCartItem = {
            product_id: product.id,
            quantity: 1,
            user_id: user?.id,
            product_name: product.product_name,
            product_price: product.product_price,
          };

          return (
            <ProdCard
              key={product.id}
              product={product}
              newWishlistItem={newWishlistItem}
              newCartItem={newCartItem}
            />
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 mb-5">
          {/* Previous Button */}
          <button onClick={prevPage} disabled={currentPage === 1}>
            <Icon
              name="arrowLeft"
              className={` size-8 ${
                currentPage === 1
                  ? "cursor-not-allowed text-gray-500"
                  : "cursor-pointer"
              }`}
            />
          </button>

          {/* Page Numbers */}
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => {
                // Show first page, last page, and pages around current page
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`size-8 ${
                        currentPage === pageNum
                          ? "bg-black text-white"
                          : "bg-gray-100 text-black hover:bg-gray-200"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }

                // Show ... for gaps
                if (
                  pageNum === currentPage - 2 ||
                  pageNum === currentPage + 2
                ) {
                  return (
                    <span
                      key={pageNum}
                      className="w-10 h-10 flex items-center justify-center"
                    >
                      ...
                    </span>
                  );
                }

                return null;
              },
            )}
          </div>

          {/* Next Button */}
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            <Icon
              name="arrowRight"
              className={`size-8 ${
                currentPage === totalPages
                  ? "cursor-not-allowed text-gray-500"
                  : " cursor-pointer"
              }`}
            />
          </button>
        </div>
      )}

      {/* Page Info */}
      {totalPages > 1 && (
        <div className="text-center text-gray-500 text-sm  font-[jost]">
          Page {currentPage} / {totalPages}
        </div>
      )}
    </div>
  );
};

export default ProdGridPaginated;
