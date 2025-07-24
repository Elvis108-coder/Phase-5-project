import React from "react";

const ExportData = () => {
  const handleExport = () => {
    // Placeholder for CSV export logic
    alert("Exported CSV!");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Export Reports</h2>
      <button
        onClick={handleExport}
        className="bg-purple-600 text-white px-4 py-2"
      >
        Export Data (CSV)
      </button>
    </div>
  );
};

export default ExportData;