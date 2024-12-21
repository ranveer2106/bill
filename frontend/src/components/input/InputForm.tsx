import {useState} from 'react';
import { item } from '../interface/interface';

interface FormData {
    name: string;
    phone:number;
    age:number;
    order:item[]
}

const InputForm = () => {

    const [amount, setAmount] = useState(0)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: 0,
        age:0,
        order: [],
    })

    let [item,setItem] = useState<item>({
        itemName:"",
        itemPrice:0,
        itemQuantity:0
    })

    const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        console.log(formData);
        
    };

    const onItemChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // setItem((prev)=>({...prev,[name]: value}));
        setItem ({ ...item, [name]: value });
        console.log(item);
        
    };

    const itemSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setFormData((prevData) => ({ ...prevData, order: [item] }));
        setFormData((prevData) => ({ ...prevData, order: [...prevData.order, item] }));
        console.log(formData);
        console.log(formData);
        setAmount(amount + item.itemPrice * item.itemQuantity)
        setItem({
            itemName:"",
        itemPrice:0,
        itemQuantity:0
        })
        
    }
    const onformsubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("final data",formData);
        
    }

  return (
    <>
        <div>
            <h1>
                InputForm
            </h1>
            <form onSubmit={onformsubmit}>

                name
                <input id="name" name='name' value={formData.name} onChange={onChangeHandler} type="text" placeholder="name" />
                phone
                <input id="phone" name="phone" value={formData.phone} onChange={onChangeHandler} type="number" placeholder="phone" />
                age
                <input id="age" name='age' value={formData.age} onChange={onChangeHandler} type="text" placeholder="age" />
                {
                    formData.order.map((item, index) => {
                        return (
                            <div key={index}>
                                <div>{item.itemName}</div>
                                <div>{item.itemPrice}</div>
                                <div>{item.itemQuantity}</div>
                            </div>
                        )
                    })
                }
                amount : {amount}
                <button type="submit">submit</button>
            </form>̥
            <form onSubmit={itemSubmit}>

                <div>
                    itemname
                    <input type="text" name='itemName' onChange={onItemChangeHandler} value={item.itemName} placeholder='enter product name' />
                    price
                    <input type="number" name='itemPrice' onChange={onItemChangeHandler} value={item.itemPrice}  placeholder="enter product price"/>
                    quantity
                    <input type="number" name='itemQuantity' onChange={onItemChangeHandler} value={item.itemQuantity}  placeholder="enter product quantity"/>
                </div>
                <button type="submit">submit</button>
            </form>
        </div>
    </>
  )
}

export default InputForm