type Comentario = {
	Id: string;
	nombre: string;
	email: string;
	comentario: string;
	fecha: Date;
}

type noticia = {
	Id:        string   
	titulo:     string
	fecha:    Date
	contenido:  string
	imagen:     string
	enlace: string
	comentarios: comentarios_noticia[]
}

type comentarios_noticia = {
	Id:        string 
	nombre:    string
	email:      string
	comentario: string
	fecha:      Date
	noticiaId:  string  
	noticia:    noticia
}