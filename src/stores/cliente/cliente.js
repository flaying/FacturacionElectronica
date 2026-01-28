import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/services/urlAxiosAPI";

export const useClientesStore = defineStore("clientes", () => {
  const clientes = ref([]);
  const totalRecords = ref(0);
  const loading = ref(false);

const clientes2 = ref([]);


  //  NUEVO
  const tableInstance = ref(null);

  //  EDITAR
  const clienteEditar = ref(null);

  const setTableInstance = (dt) => {
    tableInstance.value = dt;
  };

  const refrescarTabla = () => {
    tableInstance.value?.ajax.reload(null, false);
  };

  const setClienteEditar = (cliente) => {
    clienteEditar.value = cliente;
  };

  const limpiarClienteEditar = () => {
    clienteEditar.value = null;
  };

  // ======================
  // LISTAR CLIENTES
  // ======================
  const getClientes = async (dataTableParams) => {
    loading.value = true;

    const payload = {
      draw: dataTableParams.draw,
      start: dataTableParams.start,
      length: dataTableParams.length,
      searchValue: dataTableParams.search?.value || "",
      conexion: localStorage.getItem("conexionString"),
    };

    try {
      const response = await api.post("/api/Clientes/ListaClientes", payload);

      clientes.value = response.data.data || [];
      totalRecords.value = response.data.recordsTotal || 0;

      return response.data;
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      return {
        draw: payload.draw,
        recordsTotal: 0,
        recordsFiltered: 0,
        data: [],
      };
    } finally {
      loading.value = false;
    }
  };

  // ======================
  // GUARDAR / EDITAR
  // ======================
  const GuardarCliente = async (datos) => {
    loading.value = true;

    const data = {
      id: datos.id,
      nombre: datos.nombre,
      numDocumento: datos.documento,
      nrc: datos.nrc,
      departamento: datos.departamento.id_departament,
      municipio: datos.municipio.id_municipality,
      telefono: datos.telefono,
      correoElectronico: datos.email,
      giro: String(datos.giro.code_activity),
      direccion: datos.direccion,
      idDepto: "-1",
      idMuni: "-1",
      idGiro: "-1",
      retencion: datos.retencion ? 1 : 0,
      percepcion: 0,
      usuario: localStorage.getItem("id"),
      conexionString: localStorage.getItem("conexionString"),
    };

    try {
      const response = await api.post("/api/Clientes/Cliente", data);
      const resp = response.data?.[0]?.resp;

      if (resp === 1) {
        refrescarTabla();
        limpiarClienteEditar();

        return {
          ok: true,
          mensaje: "Guardado con éxito",
        };
      }

      return {
        ok: false,
        mensaje: "Error al guardar el cliente",
      };
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
      return {
        ok: false,
        mensaje: "Error de servidor",
      };
    } finally {
      loading.value = false;
    }
  };

  // ======================
  // ELIMINAR
  // ======================
  const eliminarCliente = async (id) => {
    if (!id) return { ok: false, mensaje: "ID inválido" };

    try {
      const response = await api.post("/api/Clientes/EliminarCliente", {
        id: id,
        conexionString: localStorage.getItem("conexionString"),
      });

      const resp = response.data?.[0]?.resp;
      if (resp === 1) {
        refrescarTabla();
        return { ok: true, mensaje: "Cliente eliminado correctamente" };
      } else {
        return { ok: false, mensaje: "No se pudo eliminar el cliente" };
      }
    } catch (error) {
      console.error("Error al eliminar cliente:", error.response?.data || error.message);
      return { ok: false, mensaje: "Error al eliminar cliente" };
    }
  };

 const obtenerClientes = async () => {
    loading.value = true
    try {
      const response = await api.post('/api/Clientes/ObtenerClientes',{id:0,conexionString:localStorage.getItem("conexionString")})

  //Siempre revisar como viene el json para poder obtener los datos correctamente
       clientes2.value = (response.data || []).map(cl => ({
        id: cl.id,
        nombre: cl.nombre
      }))

      loading.value = false
      return clientes2.value
    } catch (error) {
      console.error('Error al obtener clientes:', error.response?.data || error.message)
      loading.value = false
      return []
    }
  }

  return {
    clientes,
    clientes2,
    totalRecords,
    loading,
    clienteEditar,
    getClientes,
    GuardarCliente,
    setClienteEditar,
    limpiarClienteEditar,
    setTableInstance,
    refrescarTabla,
    eliminarCliente,
    obtenerClientes
  };
});
