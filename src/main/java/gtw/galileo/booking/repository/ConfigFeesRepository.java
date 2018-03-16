package gtw.galileo.booking.repository;

import gtw.galileo.booking.domain.ConfigFees;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ConfigFees entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConfigFeesRepository extends JpaRepository<ConfigFees, Long> {

}
