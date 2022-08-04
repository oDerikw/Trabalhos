package org.TrabalhoTA;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ForeignKey;

@Entity
public class Produto {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String codigo;
	private String descricao;
	private float valor;
	@ManyToOne
	@JoinColumn(name = "venda", nullable=false)
	@ForeignKey(name = "venda_fk")
	private Venda venda= new Venda();
	
	public Venda getVenda() {
		return venda;
	}

	public void setVenda(Venda venda) {
		this.venda = venda;
	}

	public Produto() {}

	public Produto(String codigo, String descricao, float valor) {
		this.codigo = codigo;
		this.descricao = descricao;
		this.valor = valor;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public float getValor() {
		return valor;
	}

	public void setValor(float valor) {
		this.valor = valor;
	}

	public Long getId() {
		return id;
	}
}
