
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ethers } from "ethers";

const GRID_SIZE = 3; // meters
const ISLAND_BOUNDS = [
  [25.582, -77.845], // Southwest
  [25.595, -77.805]  // Northeast
];

const generateGrid = (bounds, step) => {
  const grid = [];
  const [sw, ne] = bounds;
  const latDistance = (ne[0] - sw[0]) * 111000;
  const lngDistance = (ne[1] - sw[1]) * 111000;
  const latStep = (ne[0] - sw[0]) / (latDistance / step);
  const lngStep = (ne[1] - sw[1]) / (lngDistance / step);

  for (let lat = sw[0]; lat < ne[0]; lat += latStep) {
    for (let lng = sw[1]; lng < ne[1]; lng += lngStep) {
      const rectBounds = [
        [lat, lng],
        [lat + latStep, lng + lngStep],
      ];
      grid.push(rectBounds);
    }
  }
  return grid;
};

const contractAddress = "0xYourContractAddressHere";
const abi = [
  "function purchaseParcel(uint256 id) public payable"
];

export default function WhaleCayMap() {
  const [gridSquares, setGridSquares] = useState([]);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const squares = generateGrid(ISLAND_BOUNDS, GRID_SIZE);
    setGridSquares(squares);
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);

      ethProvider.getSigner().then((signer) => {
        const parcelContract = new ethers.Contract(contractAddress, abi, signer);
        setContract(parcelContract);
      });
    }
  }, []);

  const handleSquareClick = async (index) => {
    if (!contract) return alert("Smart contract not connected");
    try {
      const tx = await contract.purchaseParcel(index, {
        value: ethers.parseEther("0.015")
      });
      await tx.wait();
      alert(`Parcel #${index} purchased!`);
    } catch (error) {
      console.error(error);
      alert("Transaction failed.");
    }
  };

  return (
    <div className="h-screen w-full">
      <MapContainer
        bounds={ISLAND_BOUNDS}
        style={{ height: "100%", width: "100%" }}
        zoom={16}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://api.what3words.com/v3/tiles/web/{z}/{x}/{y}.png?key=BNCY2EXC"
          attribution='&copy; <a href="https://what3words.com/">what3words</a>'
          tileSize={256}
        />
        {gridSquares.map((bounds, i) => (
          <Rectangle
            key={`parcel-${i}`}
            bounds={bounds}
            pathOptions={{ color: "#00ff88", weight: 0.5 }}
            eventHandlers={{ click: () => handleSquareClick(i) }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
