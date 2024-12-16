import { useState, useEffect } from "react";
// import { SocketProvider } from "socket.io-react";
// import io from "socket.io-client";

export default function App() {
  const [square, setSquare] = useState<string[] | null[]>(Array(9).fill(null));
  const [xNext, setIsXnext] = useState<boolean>(false);

  // const socket = new io("http://localhost:3000/");
  // const socketSetup = () => {
  //   useEffect(() => {
  //     socket.connect();
  //   }, []);
  // };

  const handleClick = (index: number) => {
    if (square[index] || checkWinner(square)) return;
    console.log(index);
    let listSquare = square.slice();
    listSquare[index] = xNext ? "X" : "O";

    setSquare(listSquare);
    setIsXnext(!xNext);
  };

  const checkWinner = (square: string[] | null[]) => {
    const winnerList = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winnerList.length; i++) {
      const [a, b, c] = winnerList[i];
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
    return null;
  };
  const winner = checkWinner(square);

  const nextPlayer = winner ? (
    <p className="text-2xl text-green-500 font-bold">{`${winner} is winner`}</p>
  ) : (
    <p>{`Next player: ${xNext ? "X" : "O"}`}</p>
  );
  // socketSetup();
  return (
    <div className="w-full h-screen bg-gray-500 flex flex-col items-center justify-center">
      <div className="text-3xl font-bold mb-2">Tic tac toe</div>
      <div>{nextPlayer}</div>
      <div className="grid grid-cols-3 h-1/2 w-1/3 bg-white p-2 gap-2">
        {square.map((i, sqr: number) => (
          <span
            key={sqr}
            className="bg-black text-white flex items-center justify-center text-3xl font-bold"
            onClick={() => handleClick(sqr)}
          >
            {square[sqr]}
          </span>
        ))}
      </div>
    </div>
  );
}
