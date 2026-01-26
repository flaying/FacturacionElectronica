import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/services/urlAxiosAPI";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const user = ref(null);
  const codigoEmpresa = "1";

  const cobrar = false;
  const CodAffiliateTrading = 1;
  const login = async (userName, passWord) => {
    try {
      const response = await api.post("/api/Login/Login", {
        user: userName,
        passWord: passWord,
        codigoEmpresa,
      });

      const data = response.data;

      if (data.length == 0) {
        return {
          ok: false,
          message: "Usuario no encontrado",
        };
      }

      if (data[0].id == -1) {
        return {
          ok: false,
          message: "No se puedo obtener la información del usuario",
        };
      }

      localStorage.setItem("id", data[0].id);
      localStorage.setItem("user_name", data[0].user_name);
      localStorage.setItem("full_name", data[0].full_name);
      localStorage.setItem("id_rol", data[0].id_rol);
      localStorage.setItem("conexionString", data[0].conexionString);
      localStorage.setItem("emisor_ID_Local", data[0].emisor_ID_Local);
      localStorage.setItem("emisor_ID_Caja", data[0].emisor_ID_Caja);
      localStorage.setItem("codigoEmpresa", data[0].codigoEmpresa);
      localStorage.setItem("NumDocumento", data[0].NumDocumento);
      localStorage.setItem("NRC", data[0].NRC);
      localStorage.setItem("PrimerPago", data[0].PrimerPago);
      localStorage.setItem("ID_Plan", data[0].ID_Plan);
      localStorage.setItem("Descripcion_plan", data[0].Descripcion_plan);
      localStorage.setItem("Cantidad", data[0].Cantidad);
      localStorage.setItem("Monto", data[0].Monto);
      localStorage.setItem("MontoExtra", data[0].MontoExtra);

      localStorage.setItem("FechaUltimoPago", data[0].FechaUltimoPago);
      localStorage.setItem("Cobrar", cobrar);
      localStorage.setItem("businessName", data[0].businessName);
      localStorage.setItem("propina", data[0].Propina);
      localStorage.setItem("turismo", data[0].Turismo);
      localStorage.setItem("producto", data[0].producto);
      localStorage.setItem("IVA", data[0].IVA);
      localStorage.setItem("is_production", data[0].is_production);
      localStorage.setItem("CodAffiliateTrading", CodAffiliateTrading);
      return {
        ok: true,
        data,
      };
    } catch (error) {
      if (error.response) {
        const status = error.response.status;

        switch (status) {
          case 400:
            return { ok: false, status, message: "Datos inválidos" };
          case 401:
            return { ok: false, status, message: "Credenciales incorrectas" };
          case 404:
            return { ok: false, status, message: "Servicio no encontrado" };
          case 500:
            return { ok: false, status, message: "Error interno del servidor" };
          default:
            return { ok: false, status, message: "Error inesperado" };
        }
      }

      return {
        ok: false,
        status: null,
        message: "No se pudo conectar con el servidor",
      };
    }
  };

  const logout = () => {
    isAuthenticated.value = false;
    user.value = null;
    localStorage.clear();
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
  };
});
