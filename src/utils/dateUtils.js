/**
 * Date utility functions for calendar generation.
 */

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year, month) => {
  // 0 is Sunday, 1 is Monday ... 6 is Saturday
  // Adjust so 0 is Monday, 6 is Sunday for common Turkish calendar usage
  let day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

export const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

export const monthNames = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

export const dayNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
