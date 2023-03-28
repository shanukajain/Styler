interface Haircut {
    name: string;
    price: number;
  }
  
  interface Stylist {
    name: string;
    specialty: string;
    availableTimes: Date[];
  }
  
  interface Appointment {
    stylist: Stylist;
    haircut: Haircut;
    time: Date;
  }
  
  class Styler {
    private stylists: Stylist[];
    private haircuts: Haircut[];
  
    constructor(stylists: Stylist[], haircuts: Haircut[]) {
      this.stylists = stylists;
      this.haircuts = haircuts;
    }
  
    public getStylists(): Stylist[] {
      return this.stylists;
    }
  
    public getHaircuts(): Haircut[] {
      return this.haircuts;
    }
  
    public findAvailableStylists(time: Date): Stylist[] {
      return this.stylists.filter((s) => s.availableTimes.filter(el=>el.getTime()-time.getTime()===0));
    }
  
    public bookAppointment(stylist: Stylist, haircut: Haircut, time: Date): Appointment {
      // Check if the stylist is available at the specified time
      if (!this.stylists.filter((s) => s.availableTimes.filter(el=>el.getTime()-time.getTime()===0))) {
        throw new Error(`Stylist ${stylist.name} is not available at ${time}`);
      }
  
      // Remove the time from the stylist's available times
      stylist.availableTimes = stylist.availableTimes.filter((t) => t !== time);
  
      // Create the appointment object
      const appointment: Appointment = {
        stylist,
        haircut,
        time,
      };
  
      return appointment;
    }
  }
  
  // Example usage
  const bob: Stylist = {
    name: 'Bob',
    specialty: 'Coloring',
    availableTimes: [new Date('2023-03-29T09:00:00'), new Date('2023-03-29T10:00:00')],
  };
  
  const alice: Stylist = {
    name: 'Alice',
    specialty: 'Cutting',
    availableTimes: [new Date('2023-03-29T10:00:00'), new Date('2023-03-29T11:00:00')],
  };
  
  const haircuts: Haircut[] = [
    { name: 'Men\'s Cut', price: 25 },
    { name: 'Women\'s Cut', price: 40 },
    { name: 'Color', price: 80 },
  ];
  
  const salon = new Styler([bob, alice], haircuts);
  console.log(salon.getStylists());
  // Find available stylists at 10:00 AM
  const availableStylists = salon.findAvailableStylists(new Date('2023-03-29T04:30:00.000Z'));
  console.log(`Available stylists at 10:00 PM: ${availableStylists.map((s) => s.name).join(', ')}`);
  
  // Book an appointment with Bob for a men's cut at 9:00 AM
  const bobAppointment = salon.bookAppointment(bob, haircuts[0], new Date('2023-03-29T10:00:00'));
  console.log(`Booked appointment: ${bobAppointment.stylist.name} at ${bobAppointment.time} for ${bobAppointment.haircut.name} for $${bobAppointment.haircut.price}`);