import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { TiposProyectoModule } from './modules/tipos-proyecto/tipos-proyecto.module';
import { CargosModule } from './modules/cargos/cargos.module';
import { EmpleadosModule } from './modules/empleados/empleados.module';
import { EmpresasContratistasModule } from './modules/empresas-contratistas/empresas-contratistas.module';
import { ResponsablesContratistasModule } from './modules/responsables-contratistas/responsables-contratistas.module';
import { ProyectosModule } from './modules/proyectos/proyectos.module';
import { RamaTrabajoModule } from './modules/rama-trabajo/rama-trabajo.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsuariosModule,
    AuthModule,
    ClientesModule,
    TiposProyectoModule,
    CargosModule,
    EmpleadosModule,
    EmpresasContratistasModule,
    ResponsablesContratistasModule,
    ProyectosModule,
    RamaTrabajoModule,
  ],
})
export class AppModule {}