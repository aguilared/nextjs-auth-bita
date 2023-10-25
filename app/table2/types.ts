export type BitaEvents = {
  id: number;
  bitacora_id: number;
  event_date: string;
  created_at: string;
  updated_at: string;
  bitacora: {
    author: {
      name: string;
    };
  };
  description: string;
  event: {
    description: string;
  };
  tipoEvent: {
    description: string;
  };
};
