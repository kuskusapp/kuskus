export default function Loader() {
  return (
    <>
      <style>
        {`
        .container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 40px;
          height: 40px;
        }

        .dot {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          height: 100%;
        }

        .dot::before {
          content: '';
          display: block;
          height: calc(40px * 0.22);
          width: calc(40px * 0.22);
          border-radius: 50%;
          background-color: black;
        }

        .dot:nth-child(1) {
          animation: leapFrog 2.5s ease infinite;
        }

        .dot:nth-child(2) {
          transform: translateX(calc(40px * 0.4));
          animation: leapFrog 2.5s ease calc(2.5s / -1.5)
            infinite;
        }

        .dot:nth-child(3) {
          transform: translateX(calc(40px * 0.8)) rotate(0deg);
          animation: leapFrog 2.5s ease calc(2.5s / -3) infinite;
        }

        @keyframes leapFrog {
          0% {
            transform: translateX(0) rotate(0deg);
          }

          33.333% {
            transform: translateX(0) rotate(180deg);
          }

          66.666% {
            transform: translateX(calc(40px * -0.4)) rotate(180deg);
          }

          99.999% {
            transform: translateX(calc(40px * -0.8)) rotate(180deg);
          }

          100% {
            transform: translateX(0) rotate(0deg);
          }
        }
        `}
      </style>
      <div class={"container"}>
        <div class={"dot"} />
        <div class={"dot"} />
        <div class={"dot"} />
      </div>
    </>
  )
}
