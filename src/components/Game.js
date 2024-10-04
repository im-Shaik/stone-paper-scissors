import React, { useEffect, useState } from "react";
import { Container, Paper, Button } from "@mui/material";
import {
  LiaHandScissorsSolid,
  LiaHandRockSolid,
  LiaHandPaperSolid,
  LiaHourglassStartSolid,
} from "react-icons/lia";

function Game() {
  const choices = [
    { icon: <LiaHandRockSolid size={100} />, choice: "rock" },
    { icon: <LiaHandPaperSolid size={100} />, choice: "paper" },
    { icon: <LiaHandScissorsSolid size={100} />, choice: "scissors" },
  ];

  const [playerChoice, setPlayerChoice] = useState(null);
  const [botChoice, setBotChoice] = useState(null);
  const [announcement, setAnnouncement] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);

  const handlePlayer = (playerChoice) => {
    const selectedChoice = choices.find((item) => item.choice === playerChoice);
    setPlayerChoice(selectedChoice);
    const randomBotChoice = choices[Math.floor(Math.random() * choices.length)];
    setBotChoice(randomBotChoice);
  };

  useEffect(() => {
    if (playerChoice && botChoice) {
      if (playerChoice.choice === botChoice.choice) {
        setAnnouncement("It's a tie!");
      } else if (
        (playerChoice.choice === "rock" && botChoice.choice === "scissors") ||
        (playerChoice.choice === "scissors" && botChoice.choice === "paper") ||
        (playerChoice.choice === "paper" && botChoice.choice === "rock")
      ) {
        setAnnouncement("You win!");
        setPlayerScore((prev) => prev + 1);
      } else {
        setAnnouncement("You lose!");
        setBotScore((prev) => prev + 1);
      }

      // Reset after 2 seconds
      const timeout = setTimeout(() => {
        setAnnouncement("Processing....");
        setPlayerChoice(null);
        setBotChoice(null);
      }, 2000);

      return () => clearTimeout(timeout); // Cleanup the timeout
    }
  }, [playerChoice, botChoice]);

  return (
    <div>
      <Container>
        <h1
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Stone - Paper - Scissors
        </h1>
        <Paper
          elevation={3}
          style={{
            textAlign: "center",
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "700px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h1>Player</h1>
                <h2>Score: {playerScore}</h2>
                <Paper
                  elevation={3}
                  style={{
                    width: "150px",
                    height: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {playerChoice ? (
                    playerChoice.icon
                  ) : (
                    <LiaHourglassStartSolid size={100} />
                  )}
                </Paper>
              </div>
              <div>
                <h1>Bot</h1>
                <h2>Score: {botScore}</h2>
                <Paper
                  elevation={3}
                  style={{
                    width: "150px",
                    height: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {botChoice ? (
                    botChoice.icon
                  ) : (
                    <LiaHourglassStartSolid size={100} />
                  )}
                </Paper>
              </div>
            </div>
          </div>
          <h1
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            {announcement}
          </h1>
          <h3>Player Controls</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                handlePlayer("rock");
              }}
            >
              Rock
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handlePlayer("paper");
              }}
            >
              Paper
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handlePlayer("scissors");
              }}
            >
              Scissors
            </Button>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default Game;
