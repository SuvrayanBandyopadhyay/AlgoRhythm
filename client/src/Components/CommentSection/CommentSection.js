    import { useEffect,useState,useCallback } from "react";
    import { color, motion } from "framer-motion";
    import { Form, useParams } from "react-router-dom";
    import { useInView } from "react-intersection-observer";


    export default function CommentSection({darkMode})
    {
        const {id} = useParams();//Get id from router parameter
        var [hasAll,setHasAll] = useState(false);
        const [items,setItems] = useState([]);
        const { ref, inView } = useInView({ threshold: 0.5 });

        const loadMoreComments = useCallback(async () => {
        if(!hasAll){
            try{
            const response = await fetch(`http://localhost:5000/getcomments/?id=${id}&i=${items.length}`);
            const data = await response.json();
            setItems((prev) => [...prev, ...data.items]);
            setHasAll(data.hasAll)
            console.log(items.length);
            } catch(error) { 
            console.error(error)
            }
        }}, [items]);

        useEffect(() => {
        if (inView) {
            loadMoreComments();
        }
        }, [inView, loadMoreComments]); // Dependency array 

        return (
        <div style={{ 
                display: "flex",
                flexDirection: "column", 
                justifyContent: "center",
                alignItems: "center",
                }} >
            <div style={{ 
                display: "flex",
                flexDirection: "column", 
                justifyContent: "center",
                alignItems: "center",
                width: "70%"}}>     
                <hr style={{width:"100%",alignSelf: "flex-start"}}></hr>
                {items.map((item, index) => {
                return (
                    <div 
                    key={index} 
                    style={{
                        width: "100%",
                        backgroundColor: "#f8f9ff",
                        borderRadius: "8px",
                        padding: "16px",
                        marginBottom: "20px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                        border: "1px solid #e1e6f9"
                    }}
                    >
                    <h2 style={{
                        color: "#1a56db",
                        margin: "0 0 8px 0",
                        fontSize: "16px",
                        fontWeight: "600"
                    }}>
                        {item.user}
                    </h2>
                    <p style={{
                        color: "#4a5568",
                        margin: "12px 0",
                        lineHeight: "1.5",
                        fontSize: "14px"
                    }}>
                        {item.text}
                    </p>

                    </div>
                );
                })}
            <div ref={ref} style={{ width: 1, height: 1, opacity: 0 }} /> {/* Observer target */}
            </div>
            </div>
        );
    }



