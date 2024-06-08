import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { DATA } from "../../reducers/crudReducer.jsx";
import Modal from "react-bootstrap/Modal";

const GameConfig = () => {
  const data = useSelector((state) => state.data),
    arrName = data.arrNames,
    dispatch = useDispatch(),
    [modalShow, setModalShow] = useState(false),
    [configGame, setConfigGame] = useState(true),
    [addName, setAddName] = useState(""),
    [auxRepeat, setRepeat] = useState(0),
    [dado1, setDado1] = useState(0),
    [dado2, setDado2] = useState(0),
    [suma, setSuma] = useState(0),
    [turn, setTurn] = useState(0),
    [auxSuma, setAuxSuma] = useState(true),
    [message, setMessage] = useState("Nombre del jugador"),
    refMessage = useRef(),
    refDados = useRef(),
    refDados1 = useRef();

  const dadoFunction = () => {
    let auxDado1 = Math.floor(Math.random() * 6) + 1,
      auxDado2 = Math.floor(Math.random() * 6) + 1;

    setDado1(auxDado1);
    setDado2(auxDado2);
    setSuma(auxDado1 + auxDado2);

    if (auxDado1 == auxDado2) {
      setRepeat(auxRepeat + 1);
      if (auxRepeat == 0) {
        refDados.current.classList.add("yellow");
        refDados1.current.classList.add("yellow");
      }
      if (auxRepeat == 1) {
        refDados.current.classList.remove("yellow");
        refDados1.current.classList.remove("yellow");
        refDados.current.classList.add("orange");
        refDados1.current.classList.add("orange");
      }
      if (auxRepeat == 2) {
        refDados.current.classList.remove("orange");
        refDados1.current.classList.remove("orange");
        refDados.current.classList.add("red");
        refDados1.current.classList.add("red");
      }

      if (auxRepeat == 3) {
        refDados.current.classList.remove("orange");
        refDados1.current.classList.remove("orange");
        refDados.current.classList.remove("red");
        refDados1.current.classList.remove("red");
        setRepeat(0);
      }
    } else {
      refDados.current.classList.remove("yellow");
      refDados.current.classList.remove("orange");
      refDados.current.classList.remove("red");
      refDados1.current.classList.remove("yellow");
      refDados1.current.classList.remove("orange");
      refDados1.current.classList.remove("red");
      if (turn == arrName.length - 1) {
        setTurn(0);
      } else {
        setTurn(turn + 1);
      }
    }

    setAuxSuma(false);
    setTimeout(() => {
      setAuxSuma(true);
    }, 1000);
  };

  const handleClose = () => setModalShow(false);
  const handlerName = (e) => {
    setAddName(e.target.value);
  };

  const handlerBack = () => {
    if (turn == 0) {
      setTurn(arrName.length - 1)
    } else {

      setTurn(turn - 1);
    }
  };

  const arrData = () => {
    console.log("legth: " + typeof addName.length);
    if (addName.length < 3) {
      setMessage("Minimo 3 Letras");
      refMessage.current.classList.toggle("is-active");
      setTimeout(() => {
        setMessage("Nombre del jugador");
        refMessage.current.classList.toggle("is-active");
      }, 2000);
    } else {
      let auxArrNames = data.arrNames,
        auxArr = [];
      console.log(auxArrNames.length);
      if (auxArrNames.length === 0) {
        auxArr[0] = addName;
      } else {
        console.log("esta");
        for (let index = 0; index < auxArrNames.length + 1; index++) {
          console.log(index, auxArrNames.length);
          if (index == auxArrNames.length) {
            auxArr[index] = addName;
          } else {
            auxArr[index] = auxArrNames[index];
          }
        }
      }

      dispatch(DATA({ arrNames: auxArr }));
      setAddName("");
      handleClose();
    }
  };

  const deletePlayer = (aux) => {
    let auxArrNames = data.arrNames,
      auxArr = [];
    if (auxArrNames.length === 1) {
      auxArr[0] = [];
    } else {
      if (aux == 0) {
        for (let index = 1; index < auxArrNames.length; index++) {
          console.log(index, aux);
          if (index == aux) {
            console.log("de");
            auxArr[index - 1] = auxArrNames[index + 1];
            console.log(auxArr);
          } else {
            auxArr[index - 1] = auxArrNames[index];
            console.log(auxArr);
          }
        }
      } else {
        for (let index = 0; index < auxArrNames.length - 1; index++) {
          console.log(index, aux);
          if (index == aux) {
            console.log("de");
            auxArr[index] = auxArrNames[index + 1];
            console.log(auxArr);
          } else {
            auxArr[index] = auxArrNames[index];
            console.log(auxArr);
          }
        }
      }
    }

    console.log("por: " + auxArr);
    dispatch(DATA({ arrNames: auxArr }));
  };

  return (
    <div>
      {configGame ? (
        <div id="divConfig">
          <div>
            <h2>Agrega a los Jugadores</h2>
          </div>
          <div>
            {arrName.map((item, index) => (
              <div key={index}>
                <h2>{item}</h2>
                <button onClick={() => deletePlayer(index)}>X</button>
              </div>
            ))}
            <button onClick={() => setModalShow(true)}>+</button>
            <button onClick={() => setConfigGame(false)}>Comenzar</button>
          </div>
          <Modal show={modalShow} onHide={handleClose} animation={false}>
            <Modal.Body>
              <div>
                <h2 className="is-active" ref={refMessage}>
                  {message}
                </h2>
                <input type="text" onChange={handlerName} value={addName} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={arrData}>
                Listo
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <div>
          <button id="btnGame" onClick={() => dadoFunction()}>
            <div ref={refDados1}> 
            {
              dado1 == 1 ?
              <div className="divCicle uno">
                <div className="circle uno"></div>
              </div> : 
              dado1 == 2 ? 
              <div className="divCicle dos">
                <div className="circle dos"></div>
                <div className="circle dos"></div>
              </div>: 
              dado1 == 3 ? 
              <div className="divCicle tres">
                <div className="circle tres"></div>
                <div className="circle tres"></div><div className="circle tres"></div>
              </div>: 
              dado1 == 4 ? 
              <div className="divCicle">
                <div className="circle"></div>
                <div className="circle"></div><div className="circle"></div>
                <div className="circle"></div>
              </div>: 
              dado1 == 5 ? 
              <div className="divCicle">
                <div className="circle"></div><div className="circle"></div>
                <div className="circle"></div><div className="circle"></div>
                <div className="circle"></div>
              </div> : 
              <div className="divCicle">
                <div className="circle"></div><div className="circle"></div>
                <div className="circle"></div><div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            }
            </div>
            {auxSuma ? (
              <div>
                <h2>Turno actual</h2>
                <h1>{arrName[turn]}</h1>
                <h2>Siguiente turno</h2>
                <h1>
                  {turn == arrName.length - 1 ? arrName[0] : arrName[turn + 1]}
                </h1>
              </div>
            ) : (
              <div>
                <h1 className="suma">{suma}</h1>
              </div>
            )}
            <div ref={refDados}>{
              dado2 == 1 ?
              <div className="divCicle uno">
                <div className="circle uno"></div>
              </div> : 
              dado2 == 2 ? 
              <div className="divCicle dos">
                <div className="circle dos"></div>
                <div className="circle dos"></div>
              </div>: 
              dado2 == 3 ? 
              <div className="divCicle tres">
                <div className="circle tres"></div>
                <div className="circle tres"></div><div className="circle tres"></div>
              </div>: 
              dado2 == 4 ? 
              <div className="divCicle">
                <div className="circle"></div>
                <div className="circle"></div><div className="circle"></div>
                <div className="circle"></div>
              </div>: 
              dado2 == 5 ? 
              <div className="divCicle">
                <div className="circle"></div><div className="circle"></div>
                <div className="circle"></div><div className="circle"></div>
                <div className="circle"></div>
              </div> : 
              <div className="divCicle">
                <div className="circle"></div><div className="circle"></div>
                <div className="circle"></div><div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            }</div>
          </button>
          <button id="atras" onClick={handlerBack}>
            Atras
          </button>
        </div>
      )}
    </div>
  );
};

export default GameConfig;
