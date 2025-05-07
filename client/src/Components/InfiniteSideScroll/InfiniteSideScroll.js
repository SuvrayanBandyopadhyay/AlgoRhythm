import { useEffect, useState ,useCallback} from 'react';
import { Box, Card, CardContent, Typography,Paper,Stack } from "@mui/material";
import { color, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { p } from 'framer-motion/client';
import { useOutletContext } from "react-router-dom";

const InfiniteSideScroll = () => {
    var [hasAll,setHasAll] = useState(false);
    const [items, setItems] = useState([]);
    const { ref, inView } = useInView({ threshold: 0.5 });

    const { darkMode } = useOutletContext();
  
    // Load more items when last item is in view
    const loadMoreItems = useCallback(async () => {
      if(!hasAll){
        console.log(hasAll)
        console.log("sent")
        try{
          const response = await fetch(`http://localhost:5000/getrending?i=${items.length}`);
          const data = await response.json();
          setItems((prev) => [...prev, ...data.items]);
          setHasAll(data.hasAll)
          console.log(items);
        } catch(error) { 
          console.error(error)
        }
      }
    }, [items]);
  
    // Run loadMoreItems ONLY when inView changes
    useEffect(() => {
      if (inView) {
        loadMoreItems();
      }
    }, [inView, loadMoreItems]); // Dependency array 
  
    return (
    <div style={{paddingLeft:"60px"}}>
      <Box 
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          p: 2,
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 100 }}
        
          >
            <Card sx={{ minWidth: 300, height: 200, display: "flex", alignItems: "center", justifyContent: "center",flexDirection: "column" }}>
            <Box sx={{ width: "100%", height: "80%" }}>
              <img 
                src={items[index]["imagefile"]} 
                alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            </Box>
            {/* Text - Takes Bottom Half */}
            <Box sx={{ width: "100%", height: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Paper sx={{backgroundColor: darkMode ? "#444" : "black",width: "100%", height: "100%",color: "white"  }} square={true} elevation={3}>
                <p>{items[index]["title"]}</p>
              </Paper>
            </Box>
            </Card>
          </motion.div>
        ))}
        <div ref={ref} style={{ width: 1, height: 1, opacity: 0 }} /> {/* Observer target */}
      </Box>
    </div>
    );
};

export default InfiniteSideScroll
