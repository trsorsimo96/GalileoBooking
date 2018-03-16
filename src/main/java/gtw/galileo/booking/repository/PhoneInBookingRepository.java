package gtw.galileo.booking.repository;

import gtw.galileo.booking.domain.PhoneInBooking;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PhoneInBooking entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PhoneInBookingRepository extends JpaRepository<PhoneInBooking, Long> {

}
