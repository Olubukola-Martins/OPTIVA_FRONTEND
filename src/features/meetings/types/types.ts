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
  location?: string;
  link?: string;
  attendees: number[];
  _method?: string;
}

export interface IUserMeetingsData {
  success: boolean;
  data: ISingleMeeting[];
  message: string;
  meta: string;
}

export interface ISingleMeeting {
  id: number;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  link?: any;
  organizer_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  attendees: AttendeeData[];
}

export interface AttendeeData {
  id: number;
  name: string;
  current_branch_id?: any;
  is_super_admin: boolean;
  user_type: string;
  last_login_at: string;
  last_login_ip: string;
  email: string;
  email_verified_at?: any;
  phone?: any;
  employee_id?: (null | number)[];
  intl_id?: any;
  applicant_id?: any;
  is_active: boolean;
  image: string;
  created_at?: string | string;
  updated_at: string;
  pivot: Pivot;
}

interface Pivot {
  meeting_id: number;
  user_id: number;
  availability_status: string;
  created_at: string;
  updated_at: string;
}

// export interface IFetchAllMeetings {
//   success: boolean;
//   data: IFetchMeetingDatum[];
//   message: string;
//   meta: string;
// }

// interface IFetchMeetingDatum {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   start_time: string;
//   end_time: string;
//   location: string;
//   organizer_id: number;
//   status: number;
//   created_at: string;
//   updated_at: string;
// }