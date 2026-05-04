import React from "react";
import './App.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object({
  placa: yup.string().required("A placa é obrigatória"),
  nome_proprietario: yup.string().required("Nome é obrigatório"),
  numero_apartamento: yup.string().required("Número do apto é obrigatório"),
  bloco_apartamento: yup.string().required("Bloco é obrigatório"),
  modelo: yup.string().required("Modelo é obrigatório"),
  cor: yup.string().required("Cor é obrigatória"),
  numero_vaga: yup.string().required("Vaga é obrigatória")
}).required();

function App() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ 
    resolver: yupResolver(schema) 
  });

  function onSubmit(data) {
    
    const registrosAtuais = JSON.parse(localStorage.getItem("vagas_estacionamento")) || [];

    
    const vagaOcupada = registrosAtuais.find(vaga => vaga.numero_vaga === data.numero_vaga);

    if (vagaOcupada) {
      alert(`Erro: A vaga nº ${data.numero_vaga} já está ocupada por ${vagaOcupada.nome_proprietario}!`);
      return; 
    }

    
    const novosRegistros = [...registrosAtuais, data];
    localStorage.setItem("vagas_estacionamento", JSON.stringify(novosRegistros));

    console.log("Dados salvos com sucesso:", data);
    alert("Cadastro realizado com sucesso!");
    reset(); 
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <h2>Reserva de Vaga</h2>

      <label>
        Placa do veículo:
        <input {...register("placa")} />
        <p className="error">{errors.placa?.message}</p>
      </label>

      <label>
        Nome do proprietário:
        <input {...register("nome_proprietario")} />
        <p className="error">{errors.nome_proprietario?.message}</p>
      </label>

      <label>
        Número do apartamento:
        <input {...register("numero_apartamento")} />
        <p className="error">{errors.numero_apartamento?.message}</p>
      </label>

      <label>
        Bloco do apartamento:
        <input {...register("bloco_apartamento")} />
        <p className="error">{errors.bloco_apartamento?.message}</p>
      </label>

      <label>
        Modelo do veículo:
        <input {...register("modelo")} />
        <p className="error">{errors.modelo?.message}</p>
      </label>

      <label>
        Cor:
        <input {...register("cor")} />
        <p className="error">{errors.cor?.message}</p>
      </label>

      <label>
        Número da vaga:
        <input {...register("numero_vaga")} />
        <p className="error">{errors.numero_vaga?.message}</p>
      </label>

      <button type="submit">Enviar</button>
    </form>
  );
}

export default App;
