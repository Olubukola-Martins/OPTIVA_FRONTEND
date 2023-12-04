export type Appointment = {
    id?: number;
    status?: string;
    location?: string;
    resource?: string;
    address?: string;
    start: string | Date;
    end: string | Date;
};
  
export type EventItem = {
    start: Date;
    end: Date;
    data?: { appointment?: Appointment };
    isDraggable?: boolean;
};
  
export interface INewMeeting {
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  attendees: number[];
}

export interface IFetchAllMeetings {
  success: boolean;
  data: IFetchMeetingDatum[];
  message: string;
  meta: string;
}

interface IFetchMeetingDatum {
  id: number;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  organizer_id: number;
  status: number;
  created_at: string;
  updated_at: string;
}