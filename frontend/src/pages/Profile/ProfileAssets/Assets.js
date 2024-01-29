import { useEffect, useState } from "react";
import AssetCard from "../../../components/AssetCard/AssetCard";
import "./Assets.css";
import Loading from "components/Loading";
import ReactPaginate from "react-paginate";
import axios from "services/axiosConfigs";
import Profilemain from "../Main/Profilemain";

export default function Assets() {
  const [properties, setProperties] = useState([]);
  const [propertiesStart, setPropertiesStart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 5;

  useEffect(() => {
    if (loading) {
      const request = axios.get(`property/userProperty`);
      request
        .then((response) => {
          setProperties(response.data.properties);
          setPropertiesStart(response.data.properties);
          setLoading(false);
        })
        .catch((error) => {
          alert(`Error fetching properties: ${error}`);
        });
    }
  }, [loading]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % 100;
    setItemOffset(newOffset);
  };

  const sortArray = (event) => {
    if (event === "recent") {
      setProperties(propertiesStart);
    } else if (event === "low-high") {
      setProperties((prevProperties) => {
        return [...prevProperties].sort((a, b) => a.rent - b.rent);
      });
    } else if (event === "high-low") {
      setProperties((prevProperties) => {
        return [...prevProperties].sort((a, b) => b.rent - a.rent);
      });
    }
  };

  return (
    <>
      <Profilemain />
      <div id="profile--headers">
        <h1>Assets</h1>
        <div id="profile--sort">
          <div id="searchsort">
            <div id="sortitem">
              <label htmlFor="sort">Sort by: </label>
              <select
                name="sort"
                id="sort"
                onChange={(event) => sortArray(event.target.value)}
              >
                <option value="recent">Recent</option>
                <option value="low-high">Low - High</option>
                <option value="high-low">High - Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div id="asset-container">
        <div className="asset-item">
          {loading ? (
            <Loading />
          ) : properties.length > 0 ? (
            properties
              .slice(itemOffset, itemOffset + itemsPerPage)
              .map((property, key) => (
                <div key={key}>
                  <AssetCard property={property} />
                </div>
              ))
          ) : (
            <h1>No Properties Available</h1>
          )}
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={itemsPerPage}
            pageCount={Math.ceil(properties.length / itemsPerPage)}
            previousLabel="< Previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            activeClassName="active"
            pageLinkClassName="page-link"
            previousLinkClassName="prev-link"
            nextLinkClassName="next-link"
          />
        </div>
      </div>
    </>
  );
}
