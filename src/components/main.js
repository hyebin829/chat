import React, { useEffect, useState, useRef, useCallback } from "react";
import SSE_URL from "../sseurl";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, Link } from "@mui/material";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Main = () => {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState([]);
  const scrollRef = useRef();
  let eventSource = undefined;
  const theme = useTheme();
  const mdSizeDown = useMediaQuery(theme.breakpoints.down("md"));
  const mdSize = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (!listening) {
      eventSource = new EventSource(SSE_URL);

      eventSource.onopen = (event) => {
        console.log("connection opened");
      };

      eventSource.onmessage = (event) => {
        try {
          let ssedata = JSON.parse(event.data);
          setData((data) => [...data, ssedata]);
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
    if (data.length === 20) {
      data.shift();
    }
    setData(data);
    scrollEvent();
  }, [data]);

  return (
    <Grid container md={12} sm={16} xs={16}>
      <Grid item md sm xs></Grid>

      <Grid item md={10} sm={14} xs={14}>
        {" "}
        <Container>
          <div ref={scrollRef}>
            {data.map((v, i) => (
              <Link
                href={`https://gall.dcinside.com${v.url}`}
                target="_blank"
                underline="none"
              >
                {" "}
                <Card sx={{ margin: 3 }}>
                  <CardContent>
                    {mdSizeDown ? (
                      <Typography
                        sx={{
                          fontSize: 10,
                          letterSpacing: -2,
                          fontWeight: 500,
                        }}
                      >
                        {v.writer}
                      </Typography>
                    ) : mdSize ? (
                      <Typography
                        sx={{
                          fontSize: 8,
                          fontWeight: 500,
                        }}
                      >
                        {v.writer}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {mdSizeDown ? (
                      <Typography
                        sx={{
                          fontSize: 12,
                          textAlign: "left",
                        }}
                      >
                        {v.title}
                        {v.post_type === "icon_pic" ? (
                          <InsertPhotoOutlinedIcon sx={{ fontSize: 15 }} />
                        ) : (
                          ""
                        )}
                      </Typography>
                    ) : mdSize ? (
                      <Typography
                        sx={{
                          fontSize: 11,
                          textAlign: "left",
                        }}
                      >
                        {v.title}{" "}
                        {v.post_type === "icon_pic" ? (
                          <InsertPhotoOutlinedIcon sx={{ fontSize: 13 }} />
                        ) : (
                          ""
                        )}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {mdSizeDown ? (
                      <Typography
                        sx={{
                          fontSize: 11,
                          letterSpacing: -1,
                          textAlign: "right",
                        }}
                      >
                        {v.datetime}
                      </Typography>
                    ) : mdSize ? (
                      <Typography
                        sx={{
                          fontSize: 10,
                          letterSpacing: -1,
                          textAlign: "right",
                        }}
                      >
                        {v.datetime}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Grid>

      <Grid item md sm xs></Grid>
    </Grid>
  );
};

export default Main;
