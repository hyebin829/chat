import React, { useEffect, useState, useRef, useCallback } from "react";
import SSE_URL from "../sseurl";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

const Main = () => {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState([]);
  const scrollRef = useRef();
  let eventSource = undefined;

  useEffect(() => {
    if (!listening) {
      eventSource = new EventSource(SSE_URL);

      eventSource.onopen = (event) => {
        console.log("connection opened");
      };

      eventSource.onmessage = (event) => {
        try {
          let ssedata = JSON.parse(event.data.replace(/\'/g, '"'));
          // let writer = JSON.parse(event.data.replace(/\'/g, '"')).writer;
          setData((v) => [...v, ssedata]);
        } catch (error) {
          console.error(error.name);
          console.error(error.message);
          console.log(event.data);
        }
      };
      eventSource.onerror = (event) => {
        console.log(event.target.readyState);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("eventsource closed (" + event.target.readyState + ")");
        }
        eventSource.close();
      };

      setListening(true);
    }

    return () => {
      eventSource.close();
      console.log("eventsource closed");
    };
  }, []);

  const scrollEvent = useCallback(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useEffect(() => {
    scrollEvent();
  }, [data]);

  return (
    <Box>
      <div ref={scrollRef}>
        {data.map((v, i) => (
          <Link href={`https://gall.dcinside.com${v.url}`} underline="none">
            {" "}
            <Card sx={{ margin: 3 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 15, letterSpacing: -2, fontWeight: 500 }}
                >
                  {v.writer}
                </Typography>
                <Typography
                  sx={{ fontSize: 17, letterSpacing: -2, textAlign: "left" }}
                >
                  {v.title}
                </Typography>
                {""}
                <Typography
                  sx={{ fontSize: 13, letterSpacing: -1, textAlign: "right" }}
                >
                  {v.datetime}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Box>
  );
};

export default Main;
