import React, { useEffect, useState } from "react";

const Home = (props) => {
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [refNo, setRefNo] = useState("");
  const [date, setDate] = useState("");
  const [letter, setLetter] = useState("");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [num4, setNum4] = useState("");
  const [num5, setNum5] = useState("");

  const saveData = async () => {
    const obj = {
      name: name,
      ref_no: parseInt(refNo),
      date: date,
      column_1: letter,
      column_2: num1,
      column_3: num2,
      column_4: num3,
      column_5: num4,
      column_6: num5,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    await fetch("http://localhost:5000/add-row", requestOptions).then((res) => {
      getAllData();
      getNextData();
      onClearData();
    });
  };
  useEffect(() => {
    getAllData();
    getNextData();
  }, []);

  const onClearData = () => {
    setDate("");
    setName("");
    setRefNo("");
  };
  const getAllData = async () => {
    const data = await fetch("http://localhost:5000/all-rows").then((res) => {
      return res.json();
    });
    setData(data.data);
  };

  const getNextData = async () => {
    const data = await fetch("http://localhost:5000/last-row").then((res) => {
      return res.json();
    });
    setLetter(data.column_1);
    setNum1(data.column_2);
    setNum2(data.column_3);
    setNum3(data.column_4);
    setNum4(data.column_5);
    setNum5(data.column_6);
  };
  return (
    <div className="container-fluid justify-content-center align-items-center">
      <h1 style={{ marginTop: 40 }}></h1>
      <div className="justify-content-center align-items-center">
        <div className="d-flex row">
          <div className="col">
            <input
              type="text"
              value={name}
              className="form-control"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Ref No"
              value={refNo}
              onChange={(e) => setRefNo(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="date"
              value={date}
              className="form-control"
              placeholder="Date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="letter"
              maxLength={1}
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="num 1"
              inputMode="numeric"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="num 2"
              inputMode="numeric"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="num 3"
              inputMode="numeric"
              value={num3}
              onChange={(e) => setNum3(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="num 4"
              inputMode="numeric"
              value={num4}
              onChange={(e) => setNum4(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="num 5"
              inputMode="numeric"
              value={num5}
              onChange={(e) => setNum5(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-primary mt-2" onClick={saveData}>
          Submit
        </button>

        <div className="mt-5">
          <table className="table table-bordered ">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Ref No</th>
                <th scope="col">Date</th>
                <th scope="col">Letter</th>
                <th scope="col">Num 1</th>
                <th scope="col">Num 2</th>
                <th scope="col">Num 3</th>
                <th scope="col">Num 4</th>
                <th scope="col">Num 5</th>
              </tr>
            </thead>
            <tbody>
              {data.map((res, index) => (
                <tr key={index}>
                  <td scope="row">{res.name}</td>
                  <td>{res.ref_no}</td>
                  <td>{res.date}</td>
                  <td>{res.column_1}</td>
                  <td>{res.column_2}</td>
                  <td>{res.column_3}</td>
                  <td>{res.column_4}</td>
                  <td>{res.column_5}</td>
                  <td>{res.column_6}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;

// export const getServerSideProps = async (context) => {
//   const data = await fetch("http://localhost:5000/all-rows").then((res) =>
//     res.json()
//   );
//   return {
//     props: {
//       data: data,
//     }, // will be passed to the page component as props
//   };
// };
