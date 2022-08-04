package org.TrabalhoTA;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ForeignKey;

@Entity
public class Telefone {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String DDD;
	private String numero;
	private String tipo;
	@ManyToOne
	@JoinColumn(name = "cliente", nullable=false)
	@ForeignKey(name = "cliente_fk")
	private Cliente cliente= new Cliente();
	
	public Telefone() {}

	public Telefone(String ddd, String numero, String tipo) {
		DDD = ddd;
		this.numero = numero;
		this.tipo = tipo;
	}

	public String getDDD() {
		return DDD;
	}

	public void setDDD(String ddd) {
		DDD = ddd;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Long getId() {
		return id;
	}
	
	
	
	
}
