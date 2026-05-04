
import React from 'react';

function TabelaReservas({ reservas }) {
  return (
    <section className="container">
      <button className="btn newUser">Novo Registro</button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Placa</th>
            <th>Proprietário</th>
            <th>Bloco</th>
            <th>Modelo</th>
            <th>Vaga</th>
            <th>Cor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{reserva.placa}</td>
              <td>{reserva.proprietario}</td>
              <td>{reserva.bloco}</td>
              <td>{reserva.modelo}</td>
              <td>{reserva.vaga}</td>
              <td>{reserva.cor}</td>
              <td><button className="btn btn-danger">Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TabelaReservas;
