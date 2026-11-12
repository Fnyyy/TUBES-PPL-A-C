const API_BASE = '/api';

type FetchOptions = RequestInit & { params?: Record<string, string> };

async function request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...init } = options;
  let url = `${API_BASE}${endpoint}`;

  if (params) {
    const query = new URLSearchParams(params).toString();
    url += `?${query}`;
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('youtheal_token') : null;

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(!(init.body instanceof FormData) && { 'Content-Type': 'application/json' }),
      ...init.headers,
    },
    ...init,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw { status: res.status, data: body };
  }

  return res.json();
}

export const api = {
  // Public
  getCategories: () => request<{ id: number; name: string }[]>('/categories'),
  submitReport: (data: FormData) => request<{ message: string; tracking_code: string }>('/reports', { method: 'POST', body: data }),
  trackReport: (code: string) => request<{ report: TrackResult }>(`/reports/track/${code}`),
  getArticles: () => request<{ data: Article[] }>('/articles'),

  // Auth
  login: (email: string, password: string) =>
    request<{ user: User; token: string }>('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () => request<{ message: string }>('/logout', { method: 'POST' }),
  getMe: () => request<{ user: User }>('/me'),

  // Dashboard (Staff BK)
  getDashboardReports: (params?: { status?: string; search?: string }) =>
    request<{ data: DashboardReport[] }>('/dashboard/reports', { params }),
  updateReportStatus: (id: number, status: string) =>
    request<{ message: string; report: DashboardReport }>(`/reports/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
  respondToReport: (id: number, message: string) =>
    request<{ message: string; response: unknown }>(`/reports/${id}/respond`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),
};

export type TrackResult = {
  tracking_code: string;
  category: string;
  severity: string | null;
  description: string;
  status: 'Pending' | 'Investigating' | 'Ditanggapi';
  incident_date: string | null;
  incident_location: string | null;
  created_at: string;
  responses: { staff: string; message: string; created_at: string }[];
};

export type DashboardReport = {
  id: number;
  tracking_code: string;
  category: { id: number; name: string } | string;
  severity: string | null;
  perpetrator_name: string | null;
  incident_date: string | null;
  incident_location: string | null;
  description: string;
  photo_path: string | null;
  status: 'Pending' | 'Investigating' | 'Ditanggapi';
  created_at: string;
  responses?: { id: number; message: string; user?: { name: string }; created_at: string }[];
};

export type Article = {
  id: number;
  title: string;
  excerpt: string;
  image_path: string | null;
  created_at: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};
