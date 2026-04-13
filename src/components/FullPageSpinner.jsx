const FullPageSpinner = () => {
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50">
      <div className=" p-8 rounded-lg flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default FullPageSpinner;
