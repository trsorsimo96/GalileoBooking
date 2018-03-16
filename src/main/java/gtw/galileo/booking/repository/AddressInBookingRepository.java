package gtw.galileo.booking.repository;

import gtw.galileo.booking.domain.AddressInBooking;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AddressInBooking entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AddressInBookingRepository extends JpaRepository<AddressInBooking, Long> {

}
