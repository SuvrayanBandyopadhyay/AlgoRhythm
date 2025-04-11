import { useEffect, useState ,useCallback} from 'react';
import { Box, Card, CardContent, Typography,Paper,Stack } from "@mui/material";
import { color, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { p } from 'framer-motion/client';
import { useOutletContext } from "react-router-dom";

const InfiniteSideScroll = () => {
    const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => i));
    const { ref, inView } = useInView({ threshold: 0.5 });

    const { darkMode } = useOutletContext();
  
    // Load more items when last item is in view
    const loadMoreItems = useCallback(() => {
      setItems((prev) => [...prev, ...Array.from({ length: 10 }, (_, i) => prev.length + i)]);
    }, []);
  
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
                src="/src/placeimg.png" 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            </Box>
            {/* Text - Takes Bottom Half */}
            <Box sx={{ width: "100%", height: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Paper sx={{backgroundColor: darkMode ? "#444" : "black",width: "100%", height: "100%"}} square={true} elevation={3}>
                <p>ererer</p>
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