import { useNavigate } from "react-router";

function Navbar({loginstatus,setLoginstatus}) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "grey",
        padding: "10px",
        alignItems: "center",
      }}
    >
      <p style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}>My Website</p>
      <div>

        {loginstatus&&  

          <button
          style={{
            backgroundColor: "lightblue",
            fontSize: "20px",
            padding: "10px",
            borderRadius: "10px",
            marginRight: "20px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/createbook")} // ✅ Corrected here
        >
          Create +
        </button>

        }

        
        
        <button
          style={{
            padding: "20px",
            borderRadius: "50%",
            backgroundColor: "aqua",
            cursor: "pointer",
          }}
        >
          V
        </button>
      </div>
    </div>
  );
}

export default Navbar;