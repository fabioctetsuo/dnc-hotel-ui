"use client";
import ImageField from "../Form/ImageField";
import TextField from "../Form/TextField";
import Button from "../Button";
import MoneyField from "../Form/MoneyField";
import { useFormState } from "react-dom";
import { createHotel } from "@/app/api/hotels/action";
import Alert from "../Alert";

const initialState = { message: "", error: false };

const HotelForm = () => {
  const [state, formAction] = useFormState(createHotel, initialState);

  return (
    <>
      <form className="w-full" action={formAction}>
        {state.error && <Alert type="danger">{state.message}</Alert>}
        <ImageField name="image" label="Selecionar foto" id="image" />
        <TextField
          label="Nome do hospedagem"
          type="text"
          id="name"
          name="name"
          className="mt-2"
          required
        />
        <TextField
          label="Descrição da hospedagem"
          type="text"
          id="description"
          name="description"
          className="mt-2"
          required
        />
        <MoneyField
          id="price"
          label="Preço da diária"
          name="price"
          className="mt-2"
          required
        />
        <TextField
          label="Endereço"
          type="text"
          id="address"
          name="address"
          className="mt-2"
          required
        />
        <Button appearance="primary" type="submit" className="mt-2">
          Cadastrar
        </Button>
      </form>
    </>
  );
};

export default HotelForm;
