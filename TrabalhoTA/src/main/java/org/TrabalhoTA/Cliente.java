package org.TrabalhoTA;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import org.hibernate.annotations.Cascade;

@Entity
@Table(name = "Cliente")
public class Cliente {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private String data;
	private String sexo;
	private String _cpf;
	@OneToOne
	private Endereco endereco;
	@OneToMany(mappedBy = "cliente", orphanRemoval = true)
	@Cascade(org.hibernate.annotations.CascadeType.ALL)
	private List<Telefone> telefones = new ArrayList<Telefone>();
	
	public Cliente() {}
	
	public Cliente(String cpf, String nome, String data, Endereco endereco, String sexo) {
		this._cpf = cpf;
		this.nome = nome;
		this.data = data;
		this.sexo = sexo;
		this.endereco = endereco;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public String getCPF() {
		return _cpf;
	}

	public void setCPF(String cpf) {
		_cpf = cpf;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}

	public List<Telefone> getTelefones() {
		return telefones;
	}

	public void setTelefones(List<Telefone> telefones) {
		this.telefones = telefones;
	}

	public Long getId() {
		return id;
	}
	
	
	
	
	
	
}
