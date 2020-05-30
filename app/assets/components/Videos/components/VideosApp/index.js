import React from "react";
import FiltersBar from "components/Videos/components/FiltersBar";
import VideosTable from "components/Videos/components/VideosTable";

const VideosApp = () => {
  return (
    <div>
      <FiltersBar />
      <VideosTable />
    </div>
  );
};

export default VideosApp;
