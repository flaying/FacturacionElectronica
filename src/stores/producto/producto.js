import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/services/urlAxiosAPI";

export const useProductoStore = defineStore("productos", () => {
  const productos = ref([]);
  const totalRecords = ref(0);
  const loading = ref(false);

  //  NUEVO
  const tableInstance = ref(null);

  //  EDITAR
  const productoEditar = ref(null);

  const setTableInstance = (dt) => {
    tableInstance.value = dt;
  };

  const refrescarTabla = () => {
    tableInstance.value?.ajax.reload(null, false);
  };

  const setProductoEditar = (producto) => {
    productoEditar.value = producto;
  };

  const limpiarProductoEditar = () => {
    productoEditar.value = null;
  };

  // ======================
  // LISTAR PRODUCTOS
  // ======================
  const getProductos = async (dataTableParams) => {
    loading.value = true;

    const payload = {
      draw: dataTableParams.draw,
      start: dataTableParams.start,
      length: dataTableParams.length,
      searchValue: dataTableParams.search?.value || "",
      conexion: localStorage.getItem("conexionString"),
    };

    try {
      const response = await api.post("/api/Productos/ListaProductos", payload);

      productos.value = response.data.data || [];
      totalRecords.value = response.data.recordsTotal || 0;

      return response.data;
    } catch (error) {
      console.error("Error al obtener productos:", error);
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
  const GuardarProducto = async (datos) => {
    loading.value = true;
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split("T")[0];
    const data = {
      id: datos.id,
      codigo: datos.codigo,
      descripcion: datos.descripcion,
      fecha_creacion: fechaFormateada,
      fechaModifico: fechaFormateada,
      precio: parseFloat(datos.precio),
      exento: datos.exento,
      usuario: localStorage.getItem("id"),
      conexionString: localStorage.getItem("conexionString"),
    };
    console.log(data);
    try {
      const response = await api.post("/api/Productos/Producto", data);
      const resp = response.data?.[0]?.resp;

      if (resp === 1) {
        refrescarTabla();
        limpiarProductoEditar();

        return {
          ok: true,
          mensaje: "Guardado con éxito",
        };
      } else if (resp === 2) {
        return {
          ok: false,
          mensaje: "Producto ya existe",
        };
      }

      return {
        ok: false,
        mensaje: "Error al guardar el producto",
      };
    } catch (error) {
      console.error("Error al guardar el producto:", error);
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
  const eliminarProducto = async (id) => {
    if (!id) return { ok: false, mensaje: "ID inválido" };

    try {
      const response = await api.post("/api/Productos/EliminarProducto", {
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

  return {
    productos,
    totalRecords,
    loading,
    productoEditar,
    getProductos,
    GuardarProducto,
    setProductoEditar,
    limpiarProductoEditar,
    setTableInstance,
    refrescarTabla,
    eliminarProducto,
  };
});
