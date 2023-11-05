import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './contextReducer'

export default function Card(props) {
    const dispatch = useDispatchCart(); //yes

    let data = useCart(); //yes
    let navigate = useNavigate() //yes

    const priceRef = useRef(); //yes
    let options = props.options; //yes
    let foodItem = props.foodItems; //yes
    let priceOptions = Object.keys(options); //yes
    const [qty, setQty] = useState(1) //yes
    const [size, setSize] = useState("") //yes

    const handleClick = () => {
        if (!localStorage.getItem("token")) {
            navigate("/login")
        }
    }

    const handleQty = (e) => {
        setQty(e.target.value);
    }
    const handleOptions = (e) => {
        setSize(e.target.value);
    }

    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }

        console.log(food)
        console.log(new Date())

        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: food.price, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size, size })
                //console.log(data)
                return
            }
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name:props.foodItem.name, price: finalPrice, qty: qty, size, size })
        return
    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "170px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (<option key={i + 1} value={i + 1}> {i + 1} </option>
                                    )
                                })}
                            </select>

                            <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>

                            <div className='d-inline h-100 fs-5'>
                                ₹{finalPrice}/-
                            </div>
                        </div>
                        <hr>
                        </hr>
                        <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
