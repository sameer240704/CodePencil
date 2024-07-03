import React, { useState, useEffect } from "react";
import { Navbar, Sidebar, Loader } from "../components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFolder,
  FaFile,
  FaTrash,
  FaDownload,
  FaJs,
  FaHtml5,
  FaCss3,
} from "react-icons/fa";

const Storage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
    } else {
      setTimeout(() => {
        setFiles([
          {
            id: 1,
            name: "Project1",
            type: "folder",
            lastModified: "2023-07-01",
          },
          { id: 2, name: "main.js", type: "js", lastModified: "2023-07-02" },
          {
            id: 3,
            name: "styles.css",
            type: "css",
            lastModified: "2023-07-03",
          },
          {
            id: 4,
            name: "Algorithms",
            type: "folder",
            lastModified: "2023-07-04",
          },
          {
            id: 5,
            name: "index.html",
            type: "html",
            lastModified: "2023-07-05",
          },
        ]);
        setIsLoading(false);
      }, 1000);
    }
  }, [navigate]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleDelete = () => {
    if (selectedFile) {
      setFiles(files.filter((file) => file.id !== selectedFile.id));
      setSelectedFile(null);
    }
  };

  const handleDownload = () => {
    if (selectedFile && selectedFile.type !== "folder") {
      console.log(`Downloading ${selectedFile.name}`);
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "folder":
        return <FaFolder className="text-yellow-400 text-2xl mr-3" />;
      case "js":
        return <FaJs className="text-yellow-300 text-2xl mr-3" />;
      case "html":
        return <FaHtml5 className="text-orange-500 text-2xl mr-3" />;
      case "css":
        return <FaCss3 className="text-blue-400 text-2xl mr-3" />;
      default:
        return <FaFile className="text-blue-300 text-2xl mr-3" />;
    }
  };

  return (
    <div className="flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        {isLoading ? (
          <Loader />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-screen flex flex-col flex-1 overflow-auto justify-between pb-5 p-8"
          >
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md rounded-2xl shadow-2xl border border-white border-opacity-20 overflow-hidden">
              <div className="flex justify-between items-center px-8 py-4">
                <h2 className="text-3xl font-bold text-white">Storage</h2>
                <div className="space-x-2">
                  <button
                    onClick={handleDelete}
                    disabled={!selectedFile}
                    className={`px-4 py-2 rounded ${
                      selectedFile
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gray-600"
                    } text-white transition duration-200`}
                  >
                    <FaTrash className="inline mr-2" />
                    Delete
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={!selectedFile || selectedFile.type === "folder"}
                    className={`px-4 py-2 rounded ${
                      selectedFile && selectedFile.type !== "folder"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-600"
                    } text-white transition duration-200`}
                  >
                    <FaDownload className="inline mr-2" />
                    Download
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFileSelect(file)}
                    className={`p-4 rounded-lg cursor-pointer ${
                      selectedFile && selectedFile.id === file.id
                        ? "bg-white bg-opacity-30"
                        : "bg-white bg-opacity-10 hover:bg-opacity-20"
                    } transition duration-200`}
                  >
                    <div className="flex items-center">
                      {getFileIcon(file.type)}
                      <div>
                        <h3 className="text-white font-semibold">
                          {file.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Last modified: {file.lastModified}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Storage;
