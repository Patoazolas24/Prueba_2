import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/interfaces/producto.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.page.html',
  styleUrls: ['./listado-productos.page.scss'],
})
export class ListadoProductosPage implements OnInit {

  productos: Product[] = [] // guarda los productos obtenidos desde la api
  skip: number =30; // controla el numero de productos ya cargados, para la paginacion
  total: number=0; // Muestra el total de productos disponibles de la Api
  cargarMas: boolean = true; // controla si hay mas productos por cargar

  constructor(
    private productoService : ProductosService,
    private authService : AuthService,
    private navCtrl : NavController // Redirecciona a otras paginas
  ) { }

  ngOnInit() {
    this.cargarProductos() // carga los primeros productos
  }

  ionViewWillEnter(){
    this.productos = [] // vacia la lista de productos
    this.skip = 0; // comienza de nuevo el contador de productos cargados
    this.cargarMas = true; // permite cargar mas productos
    this.cargarProductos() // carga los primeros productos
  }

  cargarProductos(event? : any){
    if (!this.cargarMas){
      // Si no hay mas productos por cargar, finaliza el evento y retorna
      if (event) event.target.complete();
    }
    this.productoService.obtener_productos(this.skip).subscribe(
      (response) => {
        this.productos = [...this.productos, ...response.products] //Carga los productos del servicio
        this.total = response.total;
        this.skip += response.limit;

        //desabilita el infinite scroll
        if (this.productos.length >= this.total) {
          this.cargarMas = false;
          if (event && event.target) {
            event.target.disabled = true; // Desactiva el infinite scroll
          }
        }

        if(event){
          event.target.complete()
        }
        // si supera el total de productos de la api y se ejecutael evento y se encuentra un elemento HTML del producto
        if(this.productos.length >= this.total && event && event.target){
          event.target.disabled= true;
        }

      },
      (error) => {
        console.error('Error al cargar los productos', error)
        if(event){
          event.target.complete()
        }
      }
    )

  }
// Cargar mas productos en el caso que se siga haciendo scroll
  cargarMasProductos(event: any){
    this.cargarProductos(event)
  }

  logout(){
    this.authService.cerrarSesion();
    this.navCtrl.navigateRoot('/login')
  }


}
