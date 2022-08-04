package org.TrabalhoTA;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.OneToMany;
import javax.persistence.Id;

import org.hibernate.annotations.Cascade;

@Entity
public class Venda {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	private String codigo;
	@OneToMany(mappedBy = "venda", orphanRemoval = true)
	@Cascade(org.hibernate.annotations.CascadeType.ALL)
	private List<Produto> produtos = new ArrayList<Produto>();
	private float ValorTotal;
	
	public Venda() {}

	public Venda(String codigo, List<Produto> produtos, int valorTotal) {
		this.codigo = codigo;
		this.produtos = produtos;
		this.ValorTotal = valorTotal;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public List<Produto> getProdutos() {
		return produtos;
	}

	public void setProdutos(List<Produto> produtos) {
		this.produtos = produtos;
	}

	public Long getId() {
		return Id;
	}

	public float getValorTotal() {
		return ValorTotal;
	}

	public void setValorTotal(float valorTotal) {
		ValorTotal = valorTotal;
	}
}
