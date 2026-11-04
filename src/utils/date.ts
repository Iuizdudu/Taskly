/**
 * Retorna a data de hoje no formato YYYY-MM-DD
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formata uma string YYYY-MM-DD para visualização PT-BR (ex: "13/06/2026")
 */
export function formatDisplayDate(dateStr?: string): string {
  if (!dateStr) return 'Sem data';

  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    const today = getTodayDateString();
    if (dateStr === today) {
      return `Hoje, ${day}/${month}`;
    }
    return `Vence em ${day}/${month}/${year}`;
  }

  return dateStr;
}

/**
 * Obtém os 7 dias da semana centrados ou iniciados no domingo da semana da data de referência
 */
export interface DayInfo {
  dateStr: string; // YYYY-MM-DD
  dayNumber: number;
  dayShort: string; // DOM, SEG, TER...
  isToday: boolean;
  isPast: boolean;
}

export function getWeekDays(referenceDate: Date = new Date()): DayInfo[] {
  const current = new Date(referenceDate);
  const dayOfWeek = current.getDay(); // 0 = Domingo, 1 = Segunda, etc.
  
  // Início no Domingo
  const startOfWeek = new Date(current);
  startOfWeek.setDate(current.getDate() - dayOfWeek);
  
  const shortNames = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
  const todayStr = getTodayDateString();
  const days: DayInfo[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    days.push({
      dateStr,
      dayNumber: d.getDate(),
      dayShort: shortNames[i],
      isToday: dateStr === todayStr,
      isPast: dateStr < todayStr,
    });
  }

  return days;
}

/**
 * Formata o título do mês e ano em PT-BR (ex: "Novembro 2026")
 */
export function formatMonthYear(date: Date = new Date()): string {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}
