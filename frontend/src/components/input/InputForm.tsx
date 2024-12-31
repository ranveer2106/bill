import { useState } from 'react';
import { item } from '../interface/interface';
import html2canvas from 'html2canvas';

interface FormData {
  name: string;
  phone: number;
  age: number;
  order: item[];
}

const InputForm = () => {
  const [amount, setAmount] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: 0,
    age: 0,
    order: [],
  });

  const [item, setItem] = useState<item>({
    itemName: '',
    itemPrice: 0,
    itemQuantity: 0,
  });

  const [image, setImage] = useState<string | null>(null); // State to store the captured image

  // Handle input changes for formData
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };

  // Handle input changes for item
  const onItemChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
    console.log(item);
  };

  // Handle item submit to update order
  const itemSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData((prevData) => ({ ...prevData, order: [...prevData.order, item] }));
    setAmount(amount + item.itemPrice * item.itemQuantity);
    setItem({
      itemName: '',
      itemPrice: 0,
      itemQuantity: 0,
    });
  };

  // Handle form submit
  const onformsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('final data', formData);
  };


  const captureScreenshot = () =>{
    const elementToCapture = document.getElementById('captureArea');
    if (elementToCapture){
      html2canvas(elementToCapture).then((canvas)=>{
        const imgData = canvas.toDataURL('image/png');
        setImage(imgData);
      })
    }
    else{
      console.log("Element not found");
      
    }
  }
  const handleDownload = () => {
    if (image) {
      const link = document.createElement('a');
      link.href = image;
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}`;

    link.download = `${formData.name}_${formattedDate}.png`;
      // link.download =  formData.name+"_"+Date + '.png';
      link.click();
    } else {
      console.log("No image to download");
    }
  };

  const deleteItem = (index: number) => {
    const newOrder = [...formData.order];
    const item = newOrder[index];
    setAmount(amount - item.itemPrice * item.itemQuantity);
    newOrder.splice(index, 1);
    setFormData({ ...formData, order: newOrder });
  };

  return (
    <>
      <div>
        <h1>InputForm</h1>
        <form onSubmit={itemSubmit}>
          <div>
            itemname
            <input
              type="text"
              name="itemName"
              onChange={onItemChangeHandler}
              value={item.itemName}
              placeholder="enter product name"
            />
            price
            <input
              type="number"
              name="itemPrice"
              onChange={onItemChangeHandler}
              value={item.itemPrice}
              placeholder="enter product price"
            />
            quantity
            <input
              type="number"
              name="itemQuantity"
              onChange={onItemChangeHandler}
              value={item.itemQuantity}
              placeholder="enter product quantity"
            />
          </div>
          <button type="submit">submit</button>
        </form>
        <form id="captureArea" onSubmit={onformsubmit}>
          name
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
            type="text"
            placeholder="name"
          />
          phone
          <input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            type="number"
            placeholder="phone"
          />
          age
          <input
            id="age"
            name="age"
            value={formData.age}
            onChange={onChangeHandler}
            type="text"
            placeholder="age"
          />
          {formData.order.map((item, index) => {
            return (
              <div key={index}>
                <div>{item.itemName}</div>
                <div>{item.itemPrice}</div>
                <div>{item.itemQuantity}</div>
                <button onClick={()=>deleteItem(index)}>delete it</button>
              </div>
            );
          })}
          <div>

          gst(8%): {(amount * 0.08).toFixed(2)}
          </div>
          amount: {amount}
          <button type="submit">submit</button>
        </form>

        {/* Button to trigger screenshot capture */}
        <button onClick={captureScreenshot}>Capture Screenshot</button>
        <button onClick={handleDownload}>download</button>
        {/* Display the captured screenshot */}
        {image && (
          <div>
            <h3>Captured Screenshot</h3>
            <img id="capture" src={image} alt="Captured Screenshot" style={{ width: '600px' }} />
          </div>
        )}
      </div>
    </>
  );
};

export default InputForm;
