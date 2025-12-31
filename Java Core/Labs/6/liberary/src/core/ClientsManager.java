package core;

import java.util.ArrayList;

import interfaces.CRUD;
import models.Client;
import ui.DisplayMenu;
import ui.Screen;
import utils.ItemNotFoundException;
import utils.Validation;

public class ClientsManager implements CRUD<Client> {
  private static ArrayList<Client> clients = new ArrayList<>();

  public void run() {

    while (true) {
      int choice = DisplayMenu.clientsManager();

      switch (choice) {
        case 1:
          add();
          break;
        case 2:
          update();
          break;
        case 3:
          delete();
          break;
        case 4:
          display();
          break;
        case 5:
          displayAll();
          break;
        case 0:
          return;
        default:
          break;
      }
      Screen.goBack();
    }
  }

  public void add() {
    System.out.print("Name: ");
    String name = Validation.getName();

    System.out.print("Email: ");
    String email = Validation.getEmail();

    Client client = new Client(name, email);
    clients.add(client);

    System.out.println("\nClient has been added successfuly!");
    clients.get(clients.size() - 1).getClientDetails();
  }

  public Client retrieve() throws ItemNotFoundException {
    System.out.print("Enter client ID: ");
    int id = Validation.getInt();

    for (Client client : clients) {
      if (client.getId().equals(id)) {
        return client;
      }
    }
    throw new ItemNotFoundException();
  }

  public void display() {
    if (clients.size() == 0) {
      System.out.println("There is no clients yet!");
      return;
    }

    try {
      retrieve().getClientDetails();
    } catch (ItemNotFoundException e) {
      System.out.println(e.getMessage());
    }
  }

  public void displayAll() {
    if (clients.size() == 0) {
      System.out.println("There is no clients yet!");
      return;
    }

    clients.forEach(client -> client.getClientDetails());
  }

  public void update() {
    if (clients.size() == 0) {
      System.out.println("There is no clients yet!");
      return;
    }

    try {
      Client client = retrieve();

      client.getClientDetails();

      System.out.print("\nEnter the new data\n");

      System.out.print("Name: ");
      String name = Validation.getName();
      client.setName(name);

      System.out.print("Email: ");
      String email = Validation.getEmail();
      client.setEmail(email);

      System.out.println("\nClient has been updated successfuly!");
      client.getClientDetails();

    } catch (ItemNotFoundException e) {
      System.out.println(e.getMessage());
    }
  }

  public void delete() {
    if (clients.size() == 0) {
      System.out.println("There is no clients yet!");
      return;
    }

    try {
      Client client = retrieve();

      if (client.hasItem()) {
        System.out.println("\nCan't delete client!");
        System.out.println("Client still have items to return!");
        return;
      }

      clients.remove(client);
      System.out.println("\nClient has been deleted successfuly!");

    } catch (ItemNotFoundException e) {
      System.out.println(e.getMessage());
    }
  }
}