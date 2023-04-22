import React, { useEffect, useState } from "react";
// import Sales from "../../components/Sales/Sales";
import styles from "./MySales.module.css";
import ClosingSales from "../../components/Closing_Sales/ClosingSales";
import { useDispatch, useSelector } from "react-redux";
import { getOrderBalance } from "../../redux/Actions/actions";
import Graphic from "../../components/Graphic/Graphic";

const MySales = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderBalance());
    }, [ dispatch ]);

    const balance = useSelector((state) => state.balance);
    const [dates, setDates] = useState([]) 
    const [total, setTotal] = useState(0)
    const [values, setValues] = useState([])

    
    useEffect(() => {
        setDates(Object.keys(balance).sort((a, b) => new Date(a) - new Date(b)))
    }, [setDates, balance])
    
    useEffect(() => {
        if (dates.length) {
            const valores = []
            let myTotal = 0;
            for (const date of dates) {
                myTotal += parseInt(balance[date]?.amount);
                valores.length <= 30 && valores.push(parseInt(balance[date]?.amount));
            }
            setValues([...valores])
            setTotal(myTotal)
        }
    },[dates, setValues, setTotal, balance])
    
    // console.log(balance);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.sales}>
                    <div className={styles.description}>
                        <span>Fecha</span>
                        <span className={styles.total}>Total</span>
                        <span>Detalle</span>
                    </div>
                    {dates.map((date) => (
                        <ClosingSales
                            //key={data.code}
                            date={date}
                            amount={balance[date]?.amount}
                            data={balance[date]?.data}
                            key={date}
                        />
                    ))}
                </div>
                <div className={styles.graphic}>
                    {values.length && <Graphic total={total} values={values.reverse()} dates={dates.reverse()} />}
                </div>
            </div>
        </div>
    );
};

export default MySales;
