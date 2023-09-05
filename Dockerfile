#FROM node:18.16-alpine AS builder
#
#WORKDIR /app
#
## Copiamos el archivo package.json y package-lock.json para instalar las dependencias
#COPY package*.json ./
#RUN npm install
#
## Copiamos el resto de los archivos del proyecto
#COPY . .
#
## Construimos la aplicación de Angular
#RUN npm run build

# Ahora usamos una imagen ligera de Nginx para el despliegue
FROM nginx:1.25.2-alpine

#RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/nginx.conf

# Copiamos los archivos de construcción de la aplicación de Angular desde la etapa anterior
#COPY --from=builder /app/dist/web-calendar-front /usr/share/nginx/html

#RUN rm /usr/share/nginx/html/index.html

RUN mkdir -p /var/www/dashboard

COPY dist/web-calendar-front /var/www/dashboard

EXPOSE 4200

#CMD ["nginx", "-g", "daemon off;"]

# Comando para iniciar el servidor Nginx al iniciar el contenedor
#CMD ["nginx", "-g", "daemon off;"]
