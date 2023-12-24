import React, { useState, useEffect, useMemo, useContext } from "react";

import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";

const Home = () => {
  const { products } = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRangeIndex, setPriceRangeIndex] = useState(0);
  const [selectedOS, setSelectedOS] = useState("all");
  const [selectedMemory, setSelectedMemory] = useState("all");
  const [selectedProcessor, setSelectedProcessor] = useState("all");
  const [selectedRAM, setSelectedRAM] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const priceRangeOptions = useMemo(() => {
    return [
      { label: "All", min: 0, max: Infinity },
      { label: "Below ₹10,000", min: 0, max: 10000 },
      { label: "₹10,000 - ₹20,000", min: 10000, max: 20000 },
      { label: "₹20,000 - ₹40,000", min: 20000, max: 40000 },
      { label: "₹40,000 - ₹50,000", min: 40000, max: 50000 },
      { label: "Above ₹50,000", min: 50000, max: Infinity },
    ];
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const isNameMatched = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isOSMatched = selectedOS === "all" || product.OS === selectedOS;
      const isMemoryMatched =
        selectedMemory === "all" || product.Memory === selectedMemory;
      const isRAMMatched = selectedRAM === "all" || product.RAM === selectedRAM;
      const isProcessorMatched =
        selectedProcessor === "all" ||
        product.processor
          .toLowerCase()
          .includes(selectedProcessor.toLowerCase());
      const isPriceMatched =
        product.price >= priceRangeOptions[priceRangeIndex].min &&
        product.price < priceRangeOptions[priceRangeIndex].max;

      return (
        isNameMatched &&
        isOSMatched &&
        isMemoryMatched &&
        isRAMMatched &&
        isProcessorMatched &&
        isPriceMatched
      );
    });

    setFilteredProducts(filteredProducts);
  }, [
    products,
    searchQuery,
    selectedOS,
    selectedMemory,
    selectedProcessor,
    priceRangeIndex,
    priceRangeOptions,
    selectedRAM,
  ]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPriceRangeIndex(event.target.value);
  };
  
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "RAM":
        setSelectedRAM(value);
        break;
      case "OS":
        setSelectedOS(value);
        break;
      case "Memory":
        setSelectedMemory(value);
        break;
      case "processor":
        setSelectedProcessor(value);
        break;
      default:
        break;
    }
  };

  return (
    <div id="home">
      <section id="filters" className="py-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-col justify-between items-center">
            <div className="w-full">
              <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-md p-2 mb-4 md:mb-0 w-full"
              />
            </div>
            <div className="hidden md:flex items-center flex-wrap mt-4">
              <label htmlFor="OS" className="mr-4">
                OS:
              </label>
              <select
                value={selectedOS}
                onChange={handleFilterChange}
                name="OS"
                className="border border-gray-300 rounded-md p-2 mr-4"
              >
                <option value="all">All</option>
                <option value="Android">Android</option>
                <option value="iOS">iOS</option>
              </select>
              <label htmlFor="Memory" className="mr-4">
                Memory:
              </label>
              <select
                value={selectedMemory}
                onChange={handleFilterChange}
                name="Memory"
                className="border border-gray-300 rounded-md p-2 mr-4"
              >
                <option value="all">All</option>
                <option value="64 GB">64 GB</option>
                <option value="128 GB">128 GB</option>
                <option value="256 GB">256 GB</option>
              </select>
              <label htmlFor="RAM" className="mr-4">
                RAM:
              </label>
              <select
                value={selectedRAM}
                onChange={handleFilterChange}
                name="RAM"
                className="border border-gray-300 rounded-md p-2 mr-4"
              >
                <option value="all">All</option>
                <option value="4 GB">4 GB</option>
                <option value="6 GB">6 GB</option>
                <option value="8 GB">8 GB</option>
              </select>
              <label htmlFor="processor" className="mr-4">
                Processor:
              </label>
              <select
                value={selectedProcessor}
                onChange={handleFilterChange}
                name="processor"
                className="border border-gray-300 rounded-md p-2 mr-4"
              >
                <option value="all">All</option>
                <option value="Snapdragon">Snapdragon</option>
                <option value="Mediatek">Mediatek</option>
                <option value="Bionic">Bionic</option>
              </select>
              <label htmlFor="price" className="mr-4">
                Price:
              </label>
              <select
                value={priceRangeIndex}
                onChange={handlePriceChange}
                name="price"
                className="border border-gray-300 rounded-md p-2 mr-4"
              >
                {priceRangeOptions.map((option, index) => {
                  return (
                    <option value={index} key={index}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              className="md:hidden "
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </button>
            <div
              className={`md:hidden absolute z-1 bg-white rounded-lg shadow-md p-4 mt-20 ${
                showFilters ? "block" : "hidden"
              }`}
            >
              <label htmlFor="OS" className="mr-4">
                OS:
              </label>
              <select
                value={selectedOS}
                onChange={handleFilterChange}
                name="OS"
                className="border border-gray-300 rounded-md p-2 mr-4"
              >
                <option value="all">All</option>
                <option value="Android">Android</option>
                <option value="iOS">iOS</option>
              </select>
              <label htmlFor="Memory" className="mr-4">
                Memory:
              </label>
              <select
                value={selectedMemory}
                onChange={handleFilterChange}
                name="Memory"
                className="border border-gray-300 rounded-md p-2 mr-4"
              >
                <option value="all">All</option>
                <option value="64 GB">64 GB</option>
                <option value="128 GB">128 GB</option>
                <option value="256 GB">256 GB</option>
              </select>
              <label htmlFor="RAM" className="mr-4">
                RAM:
              </label>
              <select
                value={selectedRAM}
                onChange={handleFilterChange}
                name="RAM"
                className="border border-gray-300 rounded-md p-2 mr-4"
              >
                <option value="all">All</option>
                <option value="4 GB">4 GB</option>
                <option value="6 GB">6 GB</option>
                <option value="8 GB">8 GB</option>
              </select>
              <label htmlFor="processor" className="mr-4">
                Processor:
              </label>
              <select
                value={selectedProcessor}
                onChange={handleFilterChange}
                name="processor"
                className="border border-gray-300 rounded-md p-2 mr-4"
              >
                <option value="all">All</option>
                <option value="Snapdragon">Snapdragon</option>
                <option value="Mediatek">Mediatek</option>
                <option value="Bionic">Bionic</option>
              </select>
              <label htmlFor="price" className="mr-4">
                Price:
              </label>
              <select
                value={priceRangeIndex}
                onChange={handlePriceChange}
                name="price"
                className="border border-gray-300 rounded-md p-2 mr-4"
              >
                {priceRangeOptions.map((option, index) => {
                  return (
                    <option value={index} key={index}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section id="products">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-medium">Products</h1>
          </div>
        </div>
        <div className="container mx-auto mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4 max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredProducts.map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
