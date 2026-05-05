import React, { useState, useEffect } from "react";
import './App.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  placa: yup.string().required("Placa obrigatória"),
  nome_proprietario: yup.string().required("Nome obrigatório"),
  numero_apartamento: yup.string().required("Apto obrigatório"),
  bloco_apartamento: yup.string().required("Bloco obrigatório"),
  modelo: yup.string().required("Modelo obrigatório"),
  cor: yup.string().required("Cor obrigatória"),
  numero_vaga: yup.string().required("Vaga obrigatória")
}).required();

function App() {
  
  const [telaAtual, setTelaAtual] = useState('cadastro');
  const [reservas, setReservas] = useState([]);

  
  const vagasExistentes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ 
    resolver: yupResolver(schema) 
  });

 
  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("vagas_estacionamento")) || [];
    setReservas(dados);
  }, []);

  function onSubmit(data) {
    
    if (!vagasExistentes.includes(data.numero_vaga)) {
      alert("Erro: Essa vaga não existe no condomínio (Vagas de 1 a 10).");
      return;
    }

    
    const vagaOcupada = reservas.find(v => v.numero_vaga === data.numero_vaga);
    if (vagaOcupada) {
      alert(`Erro: A vaga ${data.numero_vaga} já está ocupada!`);
      return;
    }

  
    const novaLista = [...reservas, data];
    setReservas(novaLista);
    localStorage.setItem("vagas_estacionamento", JSON.stringify(novaLista));
    
    console.log("Dados Cadastrados:", data); 
    alert("Cadastro realizado com sucesso!");
    reset();
  }

  return (
    <div className="App">
      <header>
        <h1>Controle de Estacionamento</h1>
        <nav>
          <button onClick={() => setTelaAtual('cadastro')}>Cadastrar Reserva</button>
          <button onClick={() => setTelaAtual('listagem')}>Ver Vagas</button>
        </nav>
      </header>

      <main>
        {telaAtual === 'cadastro' ? (
          
          <section className="container">
            <h2>Nova Reserva</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Placa: <input {...register("placa")} /></label>
              <p className="error">{errors.placa?.message}</p>

              <label>Proprietário: <input {...register("nome_proprietario")} /></label>
              <p className="error">{errors.nome_proprietario?.message}</p>

              <label>Apto: <input {...register("numero_apartamento")} /></label>
              <p className="error">{errors.numero_apartamento?.message}</p>

              <label>Bloco: <input {...register("bloco_apartamento")} /></label>
              <p className="error">{errors.bloco_apartamento?.message}</p>

              <label>Modelo: <input {...register("modelo")} /></label>
              <p className="error">{errors.modelo?.message}</p>

              <label>Cor: <input {...register("cor")} /></label>
              <p className="error">{errors.cor?.message}</p>

              <label>Nº da Vaga: <input {...register("numero_vaga")} /></label>
              <p className="error">{errors.numero_vaga?.message}</p>

              <button type="submit" className="btn-salvar">Salvar Reserva</button>
            </form>
          </section>
        ) : (
          
          <section className="container">
            <h2>Status das Vagas</h2>
            <div className="vagas-grid">
              {vagasExistentes.map(vaga => {
                const ocupante = reservas.find(r => r.numero_vaga === vaga);
                return (
                  <div key={vaga} className={`vaga-card ${ocupante ? 'ocupada' : 'disponivel'}`}>
                    <strong>Vaga {vaga}</strong>
                    {ocupante ? (
                      <p>{ocupante.modelo} - {ocupante.placa}</p>
                    ) : (
                      <p>Livre</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
