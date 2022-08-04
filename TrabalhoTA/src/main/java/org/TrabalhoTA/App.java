package org.TrabalhoTA;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class App 
{
	public static void main( String[] args )
	{
		// Telefones //
		Telefone t1 = new Telefone("43", "991020301", "Celular");
		Telefone t2 = new Telefone("43", "981020302", "Celular");
		// Endereço //
		Endereco end = new Endereco("Rua Andrade", 2554, "Alto da VX", "Guarapuava");
		// Declaração do cliente //
		Cliente c1 = new Cliente();
		c1.setNome("Derik Leonardo");
		c1.setData("20/10/2002");
		c1.setSexo("Masculino");
		c1.setCPF("100");
		c1.setEndereco(end);
		
		t1.setCliente(c1);
		t2.setCliente(c1);
		
		// Lista de Telefones //
		List<Telefone> telefones = new ArrayList<Telefone>();
		telefones.add(t1);
		telefones.add(t2);
		c1.setTelefones(telefones);
		
		// Venda //
		Venda v = new Venda();
		v.setCodigo("123");
		Produto p1 = new Produto ("245", "Teclado", 700);
		Produto p2 = new Produto ("541", "Mouse", 250);
		p1.setVenda(v);
		p2.setVenda(v);
		// Lista com os produtos //
		List<Produto> produtos = new ArrayList<Produto>();
		produtos.add(p1);
		produtos.add(p2);
		v.setProdutos(produtos);
		
		// Soma do valor Total //
		float soma = 0;
		for(Produto valor: produtos) {
			soma += valor.getValor();
		}
		v.setValorTotal(soma);
		
		@SuppressWarnings("deprecation")
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		
		// Salvando os itens no banco //
		session.save(c1); // Cliente
		session.save(t1); // Telefone 1
		session.save(t2); // Telefone 2
		session.save(end); // Endereço
		session.save(v);  // Venda
		session.save(p1); // Produto 1
		session.save(p2); // Produto 2
		
		tx.commit();
		session.close();
		sessionFactory.close();
	}
}
